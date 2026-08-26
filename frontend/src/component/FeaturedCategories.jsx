import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutGrid, 
  Pizza, 
  UtensilsCrossed, 
  Cake, 
  Wine, 
  Soup, 
  Beef 
} from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories mapped to wireframe icons & keys
  const categories = [
    { key: "menu_cat_all", label: "ALL", value: "all", icon: LayoutGrid },
    { key: "menu_cat_pizza", label: "Pizza", value: "pizza", icon: Pizza },
    { key: "menu_cat_burgers", label: "Burger", value: "burgers", icon: Beef },
    { key: "menu_cat_pasta", label: "Pizza", value: "pasta", icon: UtensilsCrossed },
    { key: "menu_cat_drinks", label: "Drinks", value: "drinks", icon: Wine },
    { key: "menu_cat_desserts", label: "Deserts", value: "desserts", icon: Cake },
    { key: "menu_cat_noodle", label: "Noodle", value: "noodle", icon: Soup },
  ];

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    navigate(`/menu?category=${categoryValue}`);
  };

  return (
    <section className="w-full bg-white py-8 select-none">
      <div className="max-w-7xl container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-6 text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            {t('categories_heading') || "Categories"}
          </h2>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = selectedCategory === cat.value;

            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.value)}
                className={`flex flex-col items-center justify-center min-w-[110px] sm:min-w-[125px] h-[100px] sm:h-[110px] rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#4B7318] text-white"
                    : "bg-[#E5E5E5] text-black hover:bg-gray-300"
                }`}
              >
                <IconComponent size={28} strokeWidth={1.5} className="mb-2" />
                <span className={`text-xs sm:text-sm font-medium ${isActive ? "font-bold" : ""}`}>
                  {t(cat.key) || cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section Divider */}
        <div className="w-full h-[1px] bg-gray-200 mt-6" />

      </div>
    </section>
  );
};

export default FeaturedCategories;