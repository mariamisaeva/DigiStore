'use client';
import React, { useState } from 'react';
import ProductList from '../../_Components/ProductList';
import SearchBar from './SearchBar';
import { Product } from '../../_utils/productsAPI';

interface AllProductsClientProps {
  products: Product[];
  categories: string[];
}

export default function AllProductsClient({ products, categories }: AllProductsClientProps) {
  const [loadCount, setLoadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = products.filter((product) => {
    return (
      product.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.attributes.category === selectedCategory)
    );
  });

  const handleLoadMore = () => {
    setLoadCount(loadCount + 2);
  };

  return (
    <div className="px-10 md:px-20 pt-10">
      <SearchBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <h1 className="text-3xl font-bold text-black my-4">All Products</h1>
      <ProductList productList={filteredProducts.slice(0, loadCount)} />
      {loadCount < filteredProducts.length && (
        <button
          onClick={handleLoadMore}
          className="w-full p-3 text-gray-500 rounded-lg transition duration-200 bg-transparent hover:shadow-md"
        >
          Load More
        </button>
      )}
    </div>
  );
}
