import React from 'react';
import Image from 'next/image';
import { TbCategoryFilled } from 'react-icons/tb';
import Link from 'next/link';

export interface ProductCardProps {
  product: {
    id: number;
    attributes: {
      title: string;
      category: string;
      price: number;
      image: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  };
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      prefetch
      className="flex flex-col hover:border hover:shadow-md rounded-lg border-blue-200 bg-white"
    >
      <Image
        src={product?.attributes?.image?.data?.attributes?.url}
        alt={product.attributes.title}
        width={400}
        height={300}
        className="rounded-t-lg h-[170px] object-cover"
      />

      <div className="flex flex-col justify-between p-3 space-y-2 bg-gray-100 rounded-b-lg">
        <div>
          <h2 className="text-black text-[16px] font-medium line-clamp-1">
            {/*cut into 1 line only*/}
            {product?.attributes?.title}
          </h2>
          <h2 className="text-sm text-gray-400 text-[12px] flex gap-1 items-center">
            <TbCategoryFilled className="w-4 h-4" />
            {product?.attributes?.category}
          </h2>
        </div>
        {/* <div className="flex justify-between items-center"> */}
        <h2 className="text-green-600 font-bold">
          ${product?.attributes?.price}
        </h2>
        {/* </div> */}
      </div>
    </Link>
  );
}
