import React from 'react';
import { AxiosResponse } from 'axios';
import { getLatestProducts, Product, StrapiResponse } from '../_utils/productsAPI';
import AllProductsClient from './_components/AllProductsClient';

export default async function AllProductsPage() {
  const res: AxiosResponse<StrapiResponse<Product[]>> = await getLatestProducts();
  const productList = res.data.data;
  const categories = Array.from(
    new Set(productList.map((product) => product.attributes.category)),
  );

  return (
    <AllProductsClient products={productList} categories={categories} />
  );
}
