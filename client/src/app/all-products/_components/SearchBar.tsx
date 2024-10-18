import React from 'react';

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
}) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Products..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      <select
        title="Search By Category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">All Categories</option>
        {}
      </select>
    </div>
  );
};

export default SearchBar;
