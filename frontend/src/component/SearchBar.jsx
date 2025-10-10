// components/SearchBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="flex items-center w-full sm:w-100 bg-white rounded-full shadow-sm px-3 py-1 border border-gray-200">
      <FiSearch className="text-gray-400 text-xl mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-50"
      />
       <button
        type="submit"
        className="px-5 py-2 bg-yellow-500 text-white text-sm font-medium rounded-r-xl shadow hover:bg-yellow-400 transition"
      >
        Find 
      </button>
    </div>
  );
};

export default Searchbar;
