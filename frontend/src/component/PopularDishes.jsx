import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingCart, Star } from "lucide-react";
import FoodModal from "./FoodModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import altimg from '../assets/heropasta.png';

const PopularDishes = () => {
  const { addtocart, foodList } = useContext(StoreContext);
  const navigate = useNavigate();

  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [user, setUser] = useState(null);
  
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const popularFoods = foodList.filter(
    (item) => item.type && item.type.toLowerCase() === "popular"
  );

  const handleAddToCart = () => {
    if (selectedFood && selectedFood._id) {
      addtocart(selectedFood._id, modalQuantity);
      toast.success(`${selectedFood.name} added to cart!`);
      setSelectedFood(null);
    }
  };

  return (
    <section className="py-20 bg-white transition-all duration-300">
      {/* 1. Header Section */}
      <div className="text-center mb-16 px-6">
          <h2 className="text-4xl font-bold mt-4 mb-2">
             Our <span className="text-brand-600">Popular</span> Dishes
          </h2>
          <p className="text-gray-600 italic">Your favourite food partner</p>
      </div>

      {/* 2. Grid Container (4 Items per row + Circular Images) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularFoods.length > 0 ? (
            popularFoods.map((dish) => (
              <div 
                key={dish._id}
                className="bg-white  rounded-[2.5rem] p-8 shadow-xl shadow-gray-100/60 border border-gray-200 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Perfect Circle Image Container */}
                <div className="relative w-44 h-44 mb-8 rounded-full overflow-hidden ">
                  <img
                    src={dish.image ? `${url}${dish.image}` : altimg}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Card Content */}
                <div className="w-full">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-bold text-gray-900 text-left leading-tight truncate">
                      {dish.name}
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
                   <p className="text-gray-400 text-xs text-left line-clamp-2 max-w-[60%]">
                      {dish.description || "The perfect blend of flavor and freshness."}
                    </p>

                  {/* Description & Price Footer */}
                  <div className="flex justify-between items-end mt-4">
                      <button 
                        onClick={() => {
                          setSelectedFood(dish);
                          setModalQuantity(1);
                        }}
                        className="flex items-center justify-center gap-2 shrink-0 border
                                  border-brand-400 hover:bg-brand-600
                                  text-brand-800 hover:text-white text-xs uppercase tracking-wide font-bold
                                  py-2 px-4 rounded-full
                                  transition-all duration-200 active:scale-95"
                      >
                        <ShoppingCart size={22} />
                        <span>Buy</span>
                      </button>          
                    <span className="text-2xl font-semibold text-gray-800 tracking-tight">
                      ${dish.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-50">
              <p className="text-xl font-medium italic italic">Looking for your favorites...</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Explore Full Menu Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => navigate("/menu")}
          className="px-10 py-4 bg-gray-900 text-white font-black rounded-2xl transition-all hover:bg-black hover:px-12 active:scale-95 shadow-2xl"
        >
          Explore Full Menu
        </button>
      </div>

      {/* 4. Functional Components */}
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