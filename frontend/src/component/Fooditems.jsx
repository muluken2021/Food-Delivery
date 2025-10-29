import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodModal from "./FoodModal";

const Fooditems = ({ category, searchQuery }) => {
  const { foodList, addtocart } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!Array.isArray(foodList)) {
    return (
      <p
        className={`text-center py-10 ${
          theme === "dark" ? "text-gray-400" : "text-gray-700"
        }`}
      >
        Loading...
      </p>
    );
  }

  const filteredFoods = foodList.filter((food) => {
    const matchesCategory =
      category.toLowerCase() === "all" ||
      food.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("You must be signed in to add items to cart!");
      return;
    }
    addtocart(selectedFood._id, modalQuantity);
    setSelectedFood(null);
  };

  return (
    <div
      className={`container mx-auto px-6 sm:px-12 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-50"
      }`}
    >
      <hr
        className={`border ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        } mb-6`}
      />

      <div className="sm:p-4 md:p-5 lg:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className={`rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col overflow-hidden ${
              theme === "dark"
                ? "bg-white/5 backdrop-blur-md"
                : "bg-white/70 backdrop-blur-sm"
            }`}
          >
            <div className="relative">
              <img
                src={
                  food.image
                    ? `http://localhost:4000${food.image}`
                    : assets.upload
                }
                alt={food.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h1
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {food.name}
              </h1>
              <p
                className={`text-sm flex-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {food.description.substring(0, 60)}...
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="font-bold text-[#e58d00]">${food.price}</p>
                <button
                  onClick={() => {
                    setSelectedFood(food);
                    setModalQuantity(1);
                  }}
                  className="bg-[#e58d00] hover:bg-yellow-400 text-white px-4 py-2 rounded-full text-sm transition-transform transform hover:scale-105"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
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
    </div>
  );
};

export default Fooditems;
