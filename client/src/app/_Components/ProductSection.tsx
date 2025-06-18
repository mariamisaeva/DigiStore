import React from 'react';
import { AxiosResponse } from 'axios';
import ProductList from './ProductList';
import { getLatestProducts, Product, StrapiResponse } from '../_utils/productsAPI';

export default async function ProductSection() {
  const res: AxiosResponse<StrapiResponse<Product[]>> = await getLatestProducts();
  const allProducts = res.data.data;
  const featuredProducts = [...allProducts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="px-6 sm:px-10 md:px-20 py-10">
      <h1
        id="featured-products"
        className="text-2xl md:text-3xl font-bold text-black my-4"
      >
        Featured Products
      </h1>
      <ProductList productList={featuredProducts} />
    </div>
  );
}
