import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import FoodModal from "./FoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import altimg from '../assets/heropasta.png';
import { food_list as fallbackData } from "../assets/foodData";
import { useTranslation } from "../context/LanguageContext";
import { getFoodName, getFoodDescription } from "../utils/foodLocale";
import { useCurrency } from "../context/CurrencyContext";

const PopularDishes = () => {
  const { addtocart, foodList } = useContext(StoreContext);
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const { formatPrice } = useCurrency();

  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [user, setUser] = useState(null);
  
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // --- LOGIC: Use Context data if available, otherwise use fallback ---
  const displayData = foodList && foodList.length > 0 ? foodList : fallbackData;

  const popularFoods = displayData.filter(
    (item) => item.type && item.type.toLowerCase() === "popular"
  );

  const handleAddToCart = () => {
    if (selectedFood && selectedFood._id) {
      addtocart(selectedFood._id, modalQuantity);
      toast.success(`${getFoodName(selectedFood, language)} added to cart!`);
      setSelectedFood(null);
    }
  };

  // Helper to resolve image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath) return altimg;
    // If it's a full URL (like from Unsplash fallback), return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, append the backend URL
    return `${url}${imagePath}`;
  };

  return (
    <section className="container mx-auto pb-20 bg-white transition-all duration-300 px-6  sm:px-12 lg:px-24">
      <div className="text-start mb-7">
         <h2 className=" text-center md:text-left text-4xl md:text-4xl font-semibold tracking-tight text-gray-900">
              {t('popular_heading')} <span className=" bg-clip-text bg-gradient-to-r text-brand-500 ">{t('popular_heading_highlight')}</span> {t('popular_heading_rest')}         </h2>
          <p className="text-gray-600 italic">{t('popular_subtitle')}</p>
      </div>

      <div className=" ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularFoods.length > 0 ? (
            popularFoods.map((dish) => (
              <div 
                key={dish._id}
                className="bg-white rounded-2xl p-4 shadow-xl shadow-gray-100/60 border flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border-brand-100"
              >
                {/* Perfect Circle Image Container */}
                <div className="relative w-full h-50 mb-8 rounded-2xl overflow-hidden shadow-inner bg-gray-50">
                  <img
                    src={getImageUrl(dish.image)}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = altimg; }} // Final fallback if URL fails
                  />
                </div>

                {/* Card Content */}
                <div className="w-full">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-bold text-gray-900 text-left leading-tight truncate">
                      {getFoodName(dish, language)}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4 justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.round(dish.rating || 5) ? "#FFB800" : "none"} 
                        className={i < Math.round(dish.rating || 5) ? "text-[#FFB800]" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-400 text-xs text-left line-clamp-2 min-h-[32px]">
                    {getFoodDescription(dish, language) || "The perfect blend of flavor and freshness."}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(dish.price)}
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedFood(dish);
                        setModalQuantity(1);
                      }}
                      className="flex items-center justify-center gap-2 border border-brand-500 hover:bg-brand-500 text-brand-600 hover:text-white text-xs uppercase tracking-widest font-bold py-2.5 px-5 rounded-full transition-all duration-300 active:scale-90"
                    >
                      <ShoppingCart size={18} />
                      <span>{t('popular_buy')}</span>
                    </button>          
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-50">
              <p className="text-xl font-medium italic">{t('popular_fetching')}</p>
            </div>
          )}
        </div>
      </div>

      
       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-12 text-lg">
          <Link to="/menu" className="text-gray-900 font-medium underline decoration-brand-500 decoration-2 underline-offset-4 flex items-center gap-1 group">
            {t('popular_browse_menu')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      {selectedFood && (
        <FoodModal
          selectedFood={selectedFood}
          modalQuantity={modalQuantity}
          setModalQuantity={setModalQuantity}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar theme="dark" />
    </section>
  );
};

export default PopularDishes;