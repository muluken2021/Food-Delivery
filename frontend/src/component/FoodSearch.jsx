import React from "react";

const FoodSearch = ({ searchQuery, setSearchQuery }) => {
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
        className="flex-1 px-4 py-3 text-sm sm:text-base rounded-xl sm:rounded-l-xl sm:rounded-r-none
        bg-brand-25 text-brand-700 placeholder-brand-400
        focus:outline-none focus:ring-2 focus:ring-brand-500
        shadow-md transition-all"
      />

      {/* If you want button later */}
      {/* 
      <button
        type="submit"
        className="px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm sm:text-base font-medium rounded-xl sm:rounded-r-xl sm:rounded-l-none shadow transition"
      >
        Find Food
      </button> 
      */}
    </div>
  );
};

export default FoodSearch;