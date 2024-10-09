import React from 'react';
import { useCart } from '../_context/cartContext';
import Image from 'next/image';

function Cart() {
  const { cart, setCart } = useCart();
  return (
    <div
      className="h-[300px] w-[250px] bg-gray-200 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto"
      style={{ color: 'black' }}
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item?.id} className="flex items-center gap-4">
              <Image
                src={item?.product?.attributes?.image?.data?.attributes?.url}
                alt="Product Image"
                width={80} // You can adjust the width and height according to your design
                height={80}
                className="size-16 rounded object-cover"
              />
              <div>
                <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Size:</dt>
                    <dd className="inline">XXS</dd>
                  </div>

                  <div>
                    <dt className="inline">Color:</dt>
                    <dd className="inline">White</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}

          {/* 
          <li className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
              alt=""
              className="size-16 rounded object-cover"
            />

            <div>
              <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt className="inline">Size:</dt>
                  <dd className="inline">XXS</dd>
                </div>

                <div>
                  <dt className="inline">Color:</dt>
                  <dd className="inline">White</dd>
                </div>
              </dl>
            </div>
          </li> */}

          {/* <li className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
              alt=""
              className="size-16 rounded object-cover"
            />

            <div>
              <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt className="inline">Size:</dt>
                  <dd className="inline">XXS</dd>
                </div>

                <div>
                  <dt className="inline">Color:</dt>
                  <dd className="inline">White</dd>
                </div>
              </dl>
            </div>
          </li> */}
        </ul>

        <div className="space-y-4 text-center">
          <a
            href="#"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart (2)
          </a>

          <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
      Cart
    </div>
  );
}

export default Cart;
