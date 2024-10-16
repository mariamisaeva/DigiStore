import React from 'react';
import Image from 'next/image';
import { TbCategoryFilled } from 'react-icons/tb';
// import { Product } from '../_utils/productsAPI';
import Link from 'next/link';

export interface ProductCardProps {
  //   product: Product;
  product: {
    id: string;
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
  //   console.log('Product ID:', product.id);
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="p-1 hover:border hover:shadow-md rounded-lg border-blue-200"
    >
      {/* <div key={product.id}>{product?.attributes.title}</div> */}
      <Image
        src={product?.attributes?.image?.data?.attributes?.url}
        alt={product.attributes.title}
        width={400}
        height={300}
        className="rounded-t-lg h-[170px] object-cover"
      />
      {/*rounded from the top only, fix the extra height and make the pics fit the predefined size*/}

      <div className="flex justify-between p-3 items-center bg-gray-100 rounded-t-lg">
        {/*padding=3 */}
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
        <h2 className="text-green-600 font-bold">
          ${product?.attributes?.price}
        </h2>
      </div>
    </Link>
  );
}
