import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Star } from "lucide-react";
import FoodModal from "./FoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import altimg from '../assets/heropasta.png';

const PopularDishes = () => {
  const { addtocart, foodList } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [user, setUser] = useState(null);
  
  const url = import.meta.env.VITE_APP_API_URL;

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Filter popular dishes from backend data
  const popularFoods = foodList.filter(
    (item) => item.type && item.type.toLowerCase() === "popular"
  );

  const handleExploreMenu = () => {
    navigate("/menu");
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("You must be signed in to add items to cart!");
      return;
    }
    if (selectedFood && selectedFood._id) {
      addtocart(selectedFood._id, modalQuantity);
      toast.success(`${selectedFood.name} added to cart!`);
      setSelectedFood(null);
    }
  };

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-50"
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2
          className={`text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          Popular Dishes
        </h2>

        {/* Decorative lines with circle */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-[4px] w-36 bg-[#e58d00]"></span>
          <span className="h-5 w-5 rounded-full bg-[#e58d00]"></span>
          <span className="h-[4px] w-36 bg-[#e58d00]"></span>
        </div>

        <p
          className={`text-base sm:text-lg ${
            theme === "dark" ? "text-white/80" : "text-gray-600"
          }`}
        >
          Handpicked meals loved by our customers — fresh, fast, and flavorful.
        </p>
      </div>

      {/* Dish Cards */}
      <div className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {popularFoods.length > 0 ? (
          popularFoods.map((dish) => (
            <div
              key={dish._id}
              className="group  md:text-start text-center transition-transform transform hover:scale-105"
            >
              <div className="relative flex justify-center md:justify-start">
                <img
                  src={
                    dish.image
                      ? `${url}${dish.image}`
                      : altimg
                  }
                  alt={dish.name}
                  className="w-60 h-60 object-contain drop-shadow-2xl transition-all duration-300 group-hover:scale-110"
                />
                  
              
              </div>

              <div className="mt-5 flex flex-col items-center sm:items-start">
                <h3
                  className={`text-xl font-semibold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dish.name}
                </h3>

                {/* Rating */}
                <div className="flex justify-center sm:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(dish.rating || 4)
                          ? "text-[#e58d00] fill-[#e58d00]"
                          : "text-gray-400"
                      }
                    />
                  ))}
                </div>

                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {dish.description || "Delicious and freshly prepared!"}
                </p>

                <span className="text-lg font-semibold text-[#e58d00] block mb-3">
                  ${dish.price}
                </span>

                <button
                  onClick={() => {
                    setSelectedFood(dish);
                    setModalQuantity(1);
                  }}
                  className="bg-[#e58d00] hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded-full transition-transform transform hover:scale-105 text-sm"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p
            className={`col-span-full text-center text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No popular dishes found 😔
          </p>
        )}
      </div>

      {/* Explore Menu Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleExploreMenu}
          className="bg-[#e58d00] hover:bg-yellow-500 text-white font-bold px-10 py-4 rounded-3xl text-lg transition-transform transform hover:scale-105"
        >
          Explore Full Menu
        </button>
      </div>

      {/* Modal */}
      {selectedFood && (
        <FoodModal
          theme={theme}
          selectedFood={selectedFood}
          modalQuantity={modalQuantity}
          setModalQuantity={setModalQuantity}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default PopularDishes;
