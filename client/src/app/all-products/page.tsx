'use client';
import React, { useEffect, useState } from 'react';
import ProductList from '../_Components/ProductList'; // Assuming ProductList is a shared component
import { getLatestProducts, StrapiResponse } from '../_utils/productsAPI';
import { AxiosResponse } from 'axios';
import { Product } from '../_utils/productsAPI';

export default function AllProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loadCount, setLoadCount] = useState(2); // Start by loading 10 products at a time

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    loadMoreProducts();
  }, [loadCount]);

  const fetchAllProducts = async () => {
    try {
      const res: AxiosResponse<StrapiResponse<Product[]>> =
        await getLatestProducts();
      setProductList(res.data.data); // Store all products
      setVisibleProducts(res.data.data.slice(0, loadCount)); // Initially load 10 products
    } catch (err) {
      console.error(err);
    }
  };

  const loadMoreProducts = () => {
    const newVisibleCount = visibleProducts.length + 2;
    setVisibleProducts(productList.slice(0, newVisibleCount));
  };

  const handleShowMore = () => {
    setLoadCount(loadCount + 2); // Load 10 more products
  };

  return (
    <div className="px-10 md:px-20 pt-10">
      {/* All products section */}
      <h1 className="text-3xl font-bold text-black my-4">All Products</h1>
      <ProductList productList={visibleProducts} />

      {visibleProducts.length < productList.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Show More
        </button>
      )}
    </div>
  );
}
