import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";

const FeaturedCategories = () => {
  const scrollRef = useRef(null);
  const { t } = useTranslation();

  const categories = [
    { id: 1, nameKey: "cat_breakfast", img: assets.breakfastIcon || "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=150&auto=format&fit=crop&q=60" },
    { id: 2, nameKey: "cat_lunch", img: assets.lunchIcon || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60" },
    { id: 3, nameKey: "cat_dinner", img: assets.dinnerIcon || "https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=60" },
    { id: 4, nameKey: "cat_desserts", img: assets.dessertIcon || "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&auto=format&fit=crop&q=60" },
    { id: 5, nameKey: "cat_drinks", img: assets.drinksIcon || "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&auto=format&fit=crop&q=60" },
    // { id: 6, nameKey: "cat_snacks", img: assets.snacksIcon || "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=150&auto=format&fit=crop&q=60" },
    { id: 7, nameKey: "cat_healthy", img: assets.healthyIcon || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&auto=format&fit=crop&q=60" },
  ];

  // Handling smooth slider actions
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6; // Scroll roughly 60% of visible container width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-22 select-none">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header Block */}
        <div className="flex items-center justify-between mb-8">
  
          <div className="text-start mb-1">
            <h2 className=" text-center md:text-left text-4xl md:text-4xl font-semibold tracking-tight text-gray-900">
                {t('categories_heading')} <span className=" bg-clip-text bg-gradient-to-r text-brand-500 ">{t('categories_heading_highlight')}</span>           </h2>
            <p className="text-gray-600 italic">{t('categories_subtitle')}</p>
          </div>
          
          {/* Navigation Control Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScroll("left")}
              className="p-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous categories"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="p-3 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-all active:scale-95 shadow-md shadow-brand-500/10 cursor-pointer"
              aria-label="Next categories"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Inner Track */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center gap-3 min-w-[120px] sm:min-w-[160px]  snap-start group cursor-pointer"
            >
              <div className="border-1 rounded-2xl border-brand-500 w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] bg-white flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-100 group-hover:border-brand-500/20 group-hover:-translate-y-1">
                <img 
                  src={category.img} 
                  alt={t(category.nameKey)} 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" 
                  loading="lazy"
                />
              </div>

              <span className="text-sm font-semibold text-gray-800 tracking-tight transition-colors group-hover:text-brand-500">
                {t(category.nameKey)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;      