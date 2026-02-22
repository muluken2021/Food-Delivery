// components/SearchBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="flex items-center w-full sm:w-100 rounded-full shadow-md px-4 py-2 border border-brand-200 bg-brand-50 transition-all duration-300">
      <FiSearch className="text-xl mr-2 text-brand-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-full bg-brand-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;