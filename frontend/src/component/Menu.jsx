import React from "react";
import FoodSearch from "./FoodSearch";
import { 
  LayoutGrid, 
  Pizza, 
  Beef, 
  UtensilsCrossed, 
  Wine, 
  Cake, 
  Soup 
} from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const Menu = ({ searchQuery, setSearchQuery, category, setcatagory }) => {
  const { t } = useTranslation();

  // Category mapping with matching wireframe icons
  const categories = [
    { label: "ALL", value: "all", icon: LayoutGrid },
    { label: "Pizza", value: "pizza", icon: Pizza },
    { label: "Burger", value: "burger", icon: Beef },
    { label: "Pasta", value: "pasta", icon: UtensilsCrossed },
    { label: "Drinks", value: "drinks", icon: Wine },
    { label: "Deserts", value: "deserts", icon: Cake },
    { label: "Noodle", value: "noodle", icon: Soup },
  ];

  return (
    <section className="w-full bg-white pt-6 pb-4 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Header & Search Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            {t('categories_heading') || "Categories"}
          </h2>
          <div className="w-full sm:w-72">
            <FoodSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {/* Categories Tile Track */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = category.toLowerCase() === cat.value.toLowerCase();

            return (
              <button
                key={cat.value}
                onClick={() => setcatagory(cat.value)}
                className={`flex flex-col items-center justify-center min-w-[110px] sm:min-w-[125px] h-[100px] sm:h-[110px] rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#4B7318] text-white"
                    : "bg-[#E5E5E5] text-black hover:bg-gray-300"
                }`}
              >
                <IconComponent size={28} strokeWidth={1.5} className="mb-2" />
                <span className={`text-xs sm:text-sm font-medium ${isActive ? "font-bold" : ""}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section Divider Line */}
        <div className="w-full h-[1px] bg-gray-200 mt-4" />

      </div>
    </section>
  );
};

export default Menu;