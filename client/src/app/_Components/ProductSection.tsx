'use client';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { getLatestProducts, StrapiResponse } from '../_utils/productsAPI';
import { AxiosResponse } from 'axios';
import { Product } from '../_utils/productsAPI';

export default function ProductSection() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const res: AxiosResponse<StrapiResponse<Product[]>> =
        await getLatestProducts();
      //   console.log(res.data.data);
      setProductList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-10 md:px-20 pt-10">
      {/*Add margin*/}
      <h1 className="text-3xl font-bold text-black my-4">Featured Products</h1>
      <ProductList productList={productList} />
    </div>
  );
}
