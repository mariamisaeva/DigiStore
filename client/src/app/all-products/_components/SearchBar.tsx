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
  categories,
}) => {
  return (
    <div className="mb-6 flex item-center space-x-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Products..."
        // className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        className="w-full p-2 border border-blue-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        style={{
          borderRight: 'none',
          borderRadius: '4px 0 0 4px',
          boxShadow: 'none',
        }}
      />

      <select
        title="Search By Category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md "
      >
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
