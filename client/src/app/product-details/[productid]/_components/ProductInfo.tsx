import React from 'react';
import { Product } from '../../../_utils/productsAPI';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { BsCloudCheck } from 'react-icons/bs';
import { IoAlertCircleOutline } from 'react-icons/io5';

function ProductInfo({ product }: { product: Product }) {
  return (
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

      <button className="flex gap-2 hover:bg-blue-400 bg-blue-600 text-white font-bold px-4 py-2 mt-5 rounded-lg">
        <HiOutlineShoppingCart className="mt-1" />
        Add to Cart
      </button>
    </div>
  );
}

export default ProductInfo;
