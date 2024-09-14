import React from 'react';
import { Product } from '../../../_utils/productsAPI';
import Image from 'next/image';
function ProductImage({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product?.attributes?.image?.data?.attributes?.url}
        alt={product?.attributes?.title}
        width={400}
        height={400}
        className="rounded-3xl "
      />
    </div>
  );
}

export default ProductImage;
