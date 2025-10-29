// src/components/FoodModal.jsx
import React from "react";
import { Star } from "lucide-react";
import { assets } from "../assets/assets";

const FoodModal = ({
  theme,
  selectedFood,
  modalQuantity,
  setModalQuantity,
  onClose,
  onAddToCart,
}) => {
  if (!selectedFood) return null;

  const increment = () => setModalQuantity((q) => q + 1);
  const decrement = () => setModalQuantity((q) => (q > 1 ? q - 1 : 1));
  
  const url = import.meta.env.VITE_APP_API_URL;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`rounded-2xl p-6 w-11/12 max-w-md transition-all ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {selectedFood.name}
          </h2>
          <button
            onClick={onClose}
            className={`font-bold text-lg ${
              theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <img
          src={
            selectedFood.image
              ? `${url}${selectedFood.image}`
              : assets.upload
          }
          alt={selectedFood.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        {/* Rating */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < Math.round(selectedFood.rating || 5)
                  ? "text-[#e58d00] fill-[#e58d00]"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Description */}
        <p
          className={`mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {selectedFood.description}
        </p>

        {/* Ingredients */}
        {selectedFood.ingredients && (
          <ul
            className={`mb-4 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {selectedFood.ingredients.map((ing, i) => (
              <li key={i}>• {ing}</li>
            ))}
          </ul>
        )}

        {/* Quantity + Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              -
            </button>
            <span
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {modalQuantity}
            </span>
            <button
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold bg-[#e58d00] hover:bg-yellow-400 text-white"
            >
              +
            </button>
          </div>
          <p className="text-lg font-bold text-[#e58d00]">
            ${(selectedFood.price * modalQuantity).toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-[#e58d00] hover:bg-yellow-400 text-white font-semibold py-3 rounded-full transition-transform transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodModal;
