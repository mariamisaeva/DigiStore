`use client`;
import React, { useContext } from 'react';
import { Product } from '../../../_utils/productsAPI';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { BsCloudCheck } from 'react-icons/bs';
import { IoAlertCircleOutline } from 'react-icons/io5';
import SkeletonProductInfo from './SkeletonProductInfo';
import { useUser, useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
// import cartAPI from '../../../_utils/cartAPI';
import { addToCart } from '../../../_utils/cartAPI';
import { useCart } from '../../../_context/cartContext';

function ProductInfo({ product }: { product: Product }) {
  const { user } = useUser();
  const router = useRouter();

  const { cart, setCart } = useCart();
  //   const { session } = useSession();

  //   console.log(user?.primaryEmailAddress?.emailAddress);
  //   console.log(user?.fullName);

  const handleAddToCart = async () => {
    // console.log('add to cart');
    if (!user) {
      router.push('/sign-in');
    } else {
      //the logic of adding the product to the cart

      //   console.log('SESSION: ', session);
      //   const token = await session?.getToken();
      //   console.log('token: ', token);
      //   console.log('PRODUCT ID', product?.id);
      const bodyData = {
        data: {
          username: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
          products: [product?.id],
        },
      };
      //   console.log('data in handleAddToCart: ', data);

      try {
        const res = await addToCart(bodyData);
        // console.log('RES: ', res);
        // console.log(res.data.data);
        const responseData = res.data.data as any;
        // console.log('Response: ', responseData.data.id);
        // console.log('PRODUCTS:', product);
        setCart((prevCart) => [
          ...prevCart,
          {
            id: responseData.id,
            product,
          },
        ]);
      } catch (err) {
        console.error('Error adding to cart: ', err);
      }
    }
  };
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className={'text-[28px]'}>{product?.attributes?.title}</h2>
          <h2 className={'text-[15px] text-gray-400'}>
            {product?.attributes?.category}
          </h2>
          <h2 className={'text-[15px] mt-5'}>
            {Array.isArray(product?.attributes?.description) &&
              product?.attributes?.description
                ?.map((descItem: any) =>
                  descItem.children?.map((child: any) => child.text).join(''),
                )
                .join(' ')}
          </h2>

          <h2 className="text-[13px] text-gray-500 mt-4 flex gap-2 items-center">
            {product?.attributes?.delivery ? (
              <BsCloudCheck className="h-5 w-5 text-green-500" />
            ) : (
              <IoAlertCircleOutline
                className="
        h-5 w-5 text-yellow-500"
              />
            )}
            Instant Delivery
          </h2>

          <h2 className="text-[28px] text-blue-600 mt-5 font-bold">
            ${product?.attributes?.price}
          </h2>

          <button
            onClick={() => handleAddToCart()}
            className="flex gap-2 hover:bg-blue-400 bg-blue-600 text-white font-bold px-4 py-2 mt-5 rounded-lg"
          >
            <HiOutlineShoppingCart className="mt-1" />
            Add to Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}

export default ProductInfo;
