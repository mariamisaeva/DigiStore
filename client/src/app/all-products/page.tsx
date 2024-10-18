'use client';
import React, { useEffect, useState } from 'react';
import ProductList from '../_Components/ProductList'; // Assuming ProductList is a shared component
import { getLatestProducts, StrapiResponse } from '../_utils/productsAPI';
import { AxiosResponse } from 'axios';
import { Product } from '../_utils/productsAPI';
import SearchBar from './_components/SearchBar';

export default function AllProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loadCount, setLoadCount] = useState(2); // Start by loading 10 products at a time
  const [searchQuery, setSearchQuery] = useState(''); //search input
  const [selectedCategory, setSelectedCategory] = useState(''); //category
  const [categories, setCategories] = useState<string[]>([]); //categories I render in dropdown

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

      // get unique categories from products
      const uniqueCategories = Array.from(
        new Set(res.data.data.map((product) => product.attributes.category)),
      );
      //  setCategories(uniqueCategories);
      console.log(uniqueCategories);
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    }
  };

  //Filter products based on SearchBar
  const filteredProducts = productList.filter((product) => {
    return (
      product.attributes.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' ||
        product.attributes.category === selectedCategory)
    );
  });

  const loadMoreProducts = () => {
    const newVisibleCount = visibleProducts.length + 2;
    setVisibleProducts(productList.slice(0, newVisibleCount));
  };

  const handleLoadMore = () => {
    setLoadCount(loadCount + 2); // Load 10 more products
  };

  return (
    <div className="px-10 md:px-20 pt-10">
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* All products section */}
      <h1 className="text-3xl font-bold text-black my-4">All Products</h1>
      {/* <ProductList productList={visibleProducts} /> */}
      <ProductList productList={filteredProducts.slice(0, loadCount)} />

      {visibleProducts.length < productList.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Load More
        </button>
      )}
    </div>
  );
}
