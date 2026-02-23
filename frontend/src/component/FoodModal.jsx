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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      
      <div className="rounded-2xl p-6 w-11/12 max-w-lg bg-white shadow-xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedFood.name}
          </h2>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image - Updated with Fallback Logic */}
        <div className="relative w-full h-[200px] rounded-xl mb-8 overflow-hidden shadow-sm flex items-center justify-center bg-gray-50">
          <img
            src={
              selectedFood.image?.startsWith("http") 
                ? selectedFood.image 
                : (selectedFood.image ? `${url}${selectedFood.image}` : assets.altimg)
            }
            alt={selectedFood.name}
            className="w-full h-full object-contain transition-transform duration-700"
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
                  : "text-gray-200"
              }
            />
          ))}
        </div>

        {/* Description */}
        <p className="mb-8 text-gray-600 text-sm leading-relaxed">
          {selectedFood.description || "The perfect blend of flavor and freshness."}
        </p>

        {/* Quantity + Price Section */}
        <div className="space-y-6">

          {/* Quantity Selector */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">
              Select Quantity
            </h2>

            <div className="flex items-center gap-4">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center rounded-full 
                          text-xl font-bold bg-gray-100 text-gray-700 
                          hover:bg-gray-200 transition active:scale-90"
              >
                −
              </button>

              <span className="text-lg font-bold text-gray-800 min-w-[30px] text-center">
                {modalQuantity}
              </span>

              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center rounded-full 
                          text-xl font-bold bg-brand-500 text-white 
                          hover:bg-brand-600 transition shadow-md shadow-brand-200 active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Total Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Total Price
            </span>

            <span className="text-2xl font-black text-gray-900">
              ${(selectedFood.price * modalQuantity).toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white 
                      font-bold py-4 rounded-xl transition-all 
                      hover:shadow-lg hover:shadow-brand-100 active:scale-95"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoodModal;