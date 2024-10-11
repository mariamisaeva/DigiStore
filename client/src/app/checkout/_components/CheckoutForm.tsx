import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import { useState } from 'react';

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
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

    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
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
