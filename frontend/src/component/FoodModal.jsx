// src/components/FoodModal.jsx
import React from "react";
import { Star, X } from "lucide-react";
import { assets } from "../assets/assets";

const FoodModal = ({
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
      
      <div className="rounded-2xl p-6 w-11/12 max-w-lg bg-white shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedFood.name}
          </h2>

          {/* Close Button */}
          <button
            onClick={onClose}
            className=" top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image */}

        <div className="relative w-[290px] h-[200px] rounded-xl mb-8 overflow-hidden shadow-gray-200 flex items-center justify-center bg-gray-50">
          <img
            src={selectedFood.image ? `${url}${selectedFood.image}` : assets.altimg}
            alt={selectedFood.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {/* Rating */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < Math.round(selectedFood.rating || 5)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-100"
              }
            />
          ))}
        </div>

        {/* Description */}
        <p className="mb-10 text-gray-600">
          {selectedFood.description}
        </p>

        {/* Ingredients
        {selectedFood.ingredients && (
          <ul className="mb-8 text-sm text-gray-600">
            {selectedFood.ingredients.map((ing, i) => (
              <li key={i}>• {ing}</li>
            ))}
          </ul>
        )} */}

        {/* Quantity + Price */}
      <div className="space-y-6 mb-8">

        {/* Quantity */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-gray-500">
            Quantity
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center rounded-full 
                        text-lg font-bold bg-gray-300 text-gray-700 
                        hover:bg-brand-200 transition"
            >
              −
            </button>

            <span className="text-lg font-semibold text-gray-700 min-w-[24px] text-center">
              {modalQuantity}
            </span>

            <button
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center rounded-full 
                        text-lg font-bold bg-brand-500 text-white 
                        hover:bg-brand-600 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Total
          </span>

          <span className="text-xl font-bold text-gray-700">
            ${(selectedFood.price * modalQuantity).toFixed(2)}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white 
                    font-semibold py-3 rounded-full transition-all 
                    hover:scale-105 active:scale-95"
        >
          Add to Cart
        </button>

      </div>
      </div>
    </div>
  );
};

export default FoodModal;