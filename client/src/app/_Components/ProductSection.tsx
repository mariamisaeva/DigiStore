'use client';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { getLatestProducts, StrapiResponse } from '../_utils/productsAPI';
import { AxiosResponse } from 'axios';
import { Product } from '../_utils/productsAPI';

export default function ProductSection() {
  const [productList, setProductList] = useState<Product[]>([]);

  //a state for featured products
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const res: AxiosResponse<StrapiResponse<Product[]>> =
        await getLatestProducts();
      //   console.log(res.data.data);
      //   setProductList(res.data.data);
      const allProducts = res.data.data; //get all products
      //select 8 random
      const randomProducts = [...allProducts]
        .sort(() => Math.random() - 0.5) //shuffle
        .slice(0, 4);

      setFeaturedProducts(randomProducts);
      setProductList(allProducts); //store all products
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-6 sm:px-10 md:px-20 py-10">
      {/*Featured products section*/}
      <h1
        id="featured-products"
        className="text-2xl md:text-3xl font-bold text-black my-4"
      >
        Featured Products
      </h1>
      <ProductList productList={featuredProducts} />

      {/*All products section*/}
      {/* <h1 className="text-3xl font-bold text-black my-4">All Products</h1>
      <ProductList productList={productList} /> */}
    </div>
  );
}
