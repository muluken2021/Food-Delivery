import React from "react";

const FoodSearch = ({ searchQuery, setSearchQuery }) => {

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // live update
  };

  return (
    <div className="flex max-w-md mx-auto mb-6">
      <div className="flex flex-1 bg-white rounded-l-xl shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Find Your Favorite Food"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2 bg-yellow-500 text-white text-sm font-medium rounded-r-xl shadow hover:bg-yellow-400 transition"
      >
        Find Food
      </button>
    </div>

  );
};

export default FoodSearch;
