// components/SearchBar.jsx
import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { ThemeContext2 } from "../context/ThemeContext2";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const { isDark } = useContext(ThemeContext2);

  return (
    <div
      className={`flex items-center w-full sm:w-100 rounded-full shadow-sm px-3 py-1 border transition-colors ${
        isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <FiSearch
        className={`text-xl mr-2 transition-colors ${
          isDark ? "text-gray-400" : "text-gray-400"
        }`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
          isDark
            ? "bg-gray-800 text-gray-100 focus:ring-transparent"
            : "bg-white text-gray-900 focus:ring-transparent"
        }`}
      />
      
    </div>
  );
};

export default SearchBar;
