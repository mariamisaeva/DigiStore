import React from 'react';
import { Product } from '../../../_utils/productsAPI';

function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <h2 className={'text-[28px]'}>{product?.attributes?.title}</h2>
      <h2 className={'text-[15px] text-gray-400'}>
        {product?.attributes?.category}
      </h2>
      <h2>
        {Array.isArray(product?.attributes?.description) &&
          product?.attributes?.description
            ?.map((descItem: any) =>
              descItem.children?.map((child: any) => child.text).join(''),
            )
            .join(' ')}
      </h2>
      <h2>${product?.attributes?.price}</h2>
    </div>
  );
}

export default ProductInfo;
