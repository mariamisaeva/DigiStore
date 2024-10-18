import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[]; //array of categories that I render
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0 w-full">
      <div className="relative w-full sm:w-auto flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Products..."
          // className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10 text-black"
          style={{
            paddingRight: '40px',
            // height: '36px',
          }}
        />

        <FiSearch
          className="absolute right-4 top-1/2 transform -translate-y-2/3 text-gray-400"
          size={20} // Size of the search icon
        />
      </div>

      <div className="w-full sm:w-auto">
        <select
          title="Search By Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500 w-auto"
          style={{
            borderRadius: '4px',
            padding: '10px',
            //   height: '36px',
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
