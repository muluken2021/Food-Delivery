import React, { useContext } from "react";
import { menu_list } from "../assets/assets";
import { ThemeContext } from "../context/ThemeContext";
import FoodSearch from "./FoodSearch";

const Menu = ({ searchQuery, setSearchQuery, category, setcatagory }) => {
  const { theme } = useContext(ThemeContext);
  console.log(category)
  return (
    <section
      className={`w-full  transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-white"
      }`}
    >
      {/* Header */}
      <header
        className={`w-full py-12 px-6 sm:px-12 lg:px-24 transition-colors duration-300 ${
          theme === "dark" ? "bg-white/5 backdrop-blur-sm" : "bg-gray-100"
        }`}
      >
        <div className="max-w-3xl">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Explore Our Food
          </h1>
          <p
            className={`mt-3 text-sm sm:text-base transition-colors duration-300 ${
              theme === "dark" ? "text-white/70" : "text-gray-700"
            }`}
          >
            Discover your favorite dishes from our wide variety of delicious meals. 
            Fresh, tasty, and crafted just for you!
          </p>
          {/* Search bar aligned to start */}
          <div className="mt-6 w-full max-w-md">
            <FoodSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Horizontal Scroll Menu */}
    <div className="px-4 lg:px-26 overflow-x-auto  scrollbar-hide py-5">
      <div className="flex gap-4 justify-center w-max pb-4 ">
        {menu_list.map((menu, index) => (
          <button
            key={index}
            onClick={() => setcatagory(menu.value)} // single click sets the category
          
            className={`cursor-pointer flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
              category === menu.value
                ? "bg-[#e58d00] text-white shadow-lg scale-105"
                : theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600 hover:scale-105"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:scale-105"
            }`}
          >
        {menu.menu_name}
      </button>
    ))}
  </div>
</div>

    </section>
  );
};

export default Menu;
