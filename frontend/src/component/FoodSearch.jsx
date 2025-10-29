import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import { search } from lucide-react;

const FoodSearch = ({ searchQuery, setSearchQuery }) => {
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center max-w-lg mx-auto mb-12 gap-2 sm:gap-0">
      {/* Input */}
      <input
        type="text"
        placeholder="Find Your Favorite Food"
        value={searchQuery}
        onChange={handleInputChange}
        className={`flex-1 px-4 py-3 text-sm sm:text-base rounded-l-xl sm:rounded-l-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md transition-colors duration-300
          ${theme === "dark" ? "bg-[#1a1a1a] text-gray-100 placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"}
        `}
      />

      {/* Button
      <button
        type="submit"
        className="px-5 py-3 bg-[#e58d00] hover:bg-yellow-500 text-white text-sm sm:text-base font-medium rounded-r-xl sm:rounded-r-xl shadow transition-colors duration-300"
      >
        Find Food
      </button> */}
    </div>
  );
};

export default FoodSearch;
