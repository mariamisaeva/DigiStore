import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../_utils/productsAPI';

export interface ProductListProps {
  productList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 */}
      {/*grid and gap */}
      {productList.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
