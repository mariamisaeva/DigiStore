import { useCart } from '@/app/_context/cartContext';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createOrder } from '../../_utils/ordersAPI';
import { deleteCartItem } from '../../_utils/cartAPI';

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
}: {
  amount: number;
}) => {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const handleError = (error: any) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    fetchCreateOrder(); //call createOrder
    send_email(); //call send email

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch('/api/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });

    if (!res.ok) {
      console.error('Failed to create payment intent:', res.statusText);
      return;
    }

    const { client_secret: clientSecret } = await res.json();

    // const successUrl =
    //   process.env.NODE_ENV === 'production'
    //     ? `${process.env.LIVE_URL}/payment-success`
    //     : 'http://localhost:3000/payment-success';

    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'https://digi-store-alpha.vercel.app/payment-success', //successUrl, //'http://localhost:3000/payment-success',
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const fetchCreateOrder = async () => {
    const ProductIds: any = [];
    cart.forEach((item) => ProductIds.push(item?.product?.id));

    const email = user?.primaryEmailAddress?.emailAddress || '';

    const payload = {
      data: {
        username: user?.fullName || '',
        email,
        amount,
        products: ProductIds,
      },
    };

    try {
      const res = await createOrder(payload);

      if (res) {
        cart.forEach((item) => {
          deleteCartItem(item?.id).then((result) => {});
        });
      }
      //   console.log(`res: `, res);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const send_email = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress || '';

    const username = user?.firstName || user?.fullName || 'Customer';
    console.log('USERNAME: ', username);

    const purchasedProducts = cart.map((item) => {
      console.log('ITEMS: ', item);
      console.log(
        ' item.product.attributes.files.data: ',
        item?.product?.attributes?.files?.data,
      );
      const files = item?.product?.attributes?.files?.data;
      const fileUrls = files.map((file: any) => file.attributes.url);

      console.log(fileUrls);

      return {
        //   id: item.product.id,
        //   quantity: item.quantity,
        //   description: item.product.attributes.description,
        //   image: item.product.attributes.image,
        //   category: item.product.attributes.category,
        title: item.product.attributes.title,
        price: item.product.attributes.price,
        downloadUrl: fileUrls,
      };
    });

    console.log('PURCHASED_PRODUCTS: ', purchasedProducts);

    const res = await fetch('/api/send', {
      method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      body: JSON.stringify({
        amount: amount / 100,
        email: userEmail,
        username,
        products: purchasedProducts, //I want to have here the purchased products
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto mt-20 max-w-sm sm:max-w-md lg:max-w-lg p-5">
        <PaymentElement />

        <button className="bg-blue-500 p-2 rounded-md w-full">Submit</button>
      </div>
    </form>
  );
};

export default CheckoutForm;

//=====================================
// item.product.attributes.files.data:

// [

//   {

//     id: 3,

//     attributes: {

//       name: '2020_Book_TheFutureOfSoftwareQualityAssu.pdf',

//       alternativeText: null,

//       caption: null,

//       width: null,

//       height: null,

//       formats: null,

//       hash: '2020_Book_The_Future_Of_Software_Quality_Assu_abab23193e',

//       ext: '.pdf',

//       mime: 'application/pdf',

//       size: 5752.59,

//       url:

//         'https://res.cloudinary.com/dm4vls99s/image/upload/v1724851785/2020_Book_The_Future_Of_Software_Quality_Assu_abab23193e.pdf',

//       previewUrl: null,

//       provider: 'cloudinary',

//       provider_metadata: { public_id: '2020_Book_The_Future_Of_Software_Quality_Assu_abab23193e', resource_type: 'image' },

//       createdAt: '2024-08-28T13:29:46.019Z',

//       updatedAt: '2024-08-28T13:29:46.019Z'

//     }

//   }

// ]

//==============
// fileUrls:

// [

//   'https://res.cloudinary.com/dm4vls99s/image/upload/v1724851785/2020_Book_The_Future_Of_Software_Quality_Assu_abab23193e.pdf'

// ]
