import React, { useState, useEffect } from "react";
import Fooditems from "../component/Fooditems";
import { 
  Search, 
  X, 
  LayoutGrid, 
  Pizza, 
  Beef, 
  UtensilsCrossed, 
  Wine, 
  Cake, 
  Soup 
} from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const FoodMenue = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  // Categories mapped to wireframe layout & icons
  const categories = [
    { key: "menu_cat_all",      label: "ALL",     value: "all",     icon: LayoutGrid },
    { key: "menu_cat_pizza",    label: "Pizza",   value: "pizza",   icon: Pizza },
    { key: "menu_cat_burgers",  label: "Burger",  value: "burgers", icon: Beef },
    { key: "menu_cat_pasta",    label: "Pasta",   value: "pasta",   icon: UtensilsCrossed },
    { key: "menu_cat_drinks",   label: "Drinks",  value: "drinks",  icon: Wine },
    { key: "menu_cat_desserts", label: "Deserts", value: "desserts",icon: Cake },
    { key: "menu_cat_noodle",   label: "Noodle",  value: "noodle",  icon: Soup },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white mt-20 select-none">
      
      {/* 1. Header & Navigation Control Bar */}
      <div className="container mx-auto px-6 max-w-7xl pt-8 pb-4">
        
        {/* Top Header & Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            {t("categories_heading") || "Categories"}
          </h1>

          {/* Search Bar Input */}
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={t("menu_search_placeholder") || "Search menu..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-[#F4F4F4] border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:border-gray-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Blocks Track */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4">
          {categories.map((item) => {
            const IconComponent = item.icon;
            const isActive = category === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`flex flex-col items-center justify-center min-w-[110px] sm:min-w-[125px] h-[100px] sm:h-[110px] rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#4B7318] text-white"
                    : "bg-[#E5E5E5] text-black hover:bg-gray-300"
                }`}
              >
                <IconComponent size={28} strokeWidth={1.5} className="mb-2" />
                <span className={`text-xs sm:text-sm font-medium ${isActive ? "font-bold" : ""}`}>
                  {t(item.key) || item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-gray-200 mt-4" />
      </div>

      {/* 2. Main Content Grid */}
      <main className="container mx-auto px-6 max-w-7xl py-6">
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2 text-gray-600">
            <p className="text-sm">
              {t("menu_showing_results") || "Showing results for"}{" "}
              <span className="text-black font-bold">"{searchQuery}"</span>
            </p>
          </div>
        )}
        
        <div className="min-h-[400px]">
          <Fooditems category={category} searchQuery={searchQuery} />
        </div>
      </main>

    </div>
  );
};

export default FoodMenue;