import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Plus, Star } from "lucide-react";
import FoodModal from "./FoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import altimg from "../assets/heropasta.png";
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return altimg;
    if (imagePath.startsWith("http")) return imagePath;
    return `${url}${imagePath}`;
  };

  return (
    <section className="max-w-7xl container mx-auto pb-20 bg-white px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {popularFoods.length > 0 ? (
          popularFoods.map((dish) => (
            <div
              key={dish._id}
              onClick={() => {
                setSelectedFood(dish);
                setModalQuantity(1);
              }}
              className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image Container */}
              <div className="w-full h-52 rounded-xl overflow-hidden mb-5 bg-gray-50">
                <img
                  src={getImageUrl(dish.image)}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = altimg;
                  }}
                />
              </div>

              {/* Dish Name & Rating */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                  {getFoodName(dish, language)}
                </h3>
                <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Category / Brand Subtitle */}
              <p className="text-xs text-gray-400 font-medium mb-4">
                {dish.category || "Al Karam"}
              </p>

              {/* Reviews Count */}
              <p className="text-xs text-gray-500 font-medium mb-4">
                (4.1k) Customer Reviews
              </p>

              {/* Price & Status Tag */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(dish.price)}
                </span>
                <button
                  onClick={() => {
                    setSelectedFood(dish);
                    setModalQuantity(1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#4B7318] hover:bg-[#3d5e13] text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Add to cart"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400">
            <p className="text-base font-medium">{t("popular_fetching")}</p>
          </div>
        )}
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