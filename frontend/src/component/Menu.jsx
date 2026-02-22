import React from "react";
import { menu_list } from "../assets/assets";
import FoodSearch from "./FoodSearch";
import { LayoutGrid } from "lucide-react";

const Menu = ({ searchQuery, setSearchQuery, category, setcatagory }) => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Search Bar */}
          <div className="w-full lg:max-w-md order-2 lg:order-1">
            <FoodSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Right: Category List */}
          <div className="w-full lg:flex-1 order-1 lg:order-2 flex flex-col items-center lg:items-end">
            <div className="relative w-full overflow-hidden">
              
              {/* Fade masks for horizontal scroll */}
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent lg:hidden"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent lg:hidden"></div>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-2 scroll-smooth">
                
                {/* "All" Category with Icon */}
                <button
                  onClick={() => setcatagory("all")}
                  className={`flex items-center gap-2 flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                    category === "all"
                      ? "bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/30 scale-105"
                      : "bg-white border-gray-200 text-gray-600 hover:border-brand-500 hover:text-brand-500"
                  }`}
                >
                  <LayoutGrid size={16} />
                  All Items
                </button>

                {menu_list.map((menu, index) => (
                  <button
                    key={index}
                    onClick={() => setcatagory(menu.value)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                      category === menu.value
                        ? "bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/30 scale-105"
                        : "bg-white border-gray-200 text-gray-600 hover:border-brand-500 hover:text-brand-500"
                    }`}
                  >
                    {menu.menu_name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;