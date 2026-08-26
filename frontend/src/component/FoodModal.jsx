import React from "react";
import { Star, X, Plus, Minus, ShoppingBag } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";
import { getFoodName, getFoodDescription } from "../utils/foodLocale";
import { useCurrency } from "../context/CurrencyContext";

const FoodModal = ({
  selectedFood,
  modalQuantity,
  setModalQuantity,
  onClose,
  onAddToCart,
}) => {
  if (!selectedFood) return null;

  const { language, t } = useTranslation();
  const { formatPrice } = useCurrency();
  const url = import.meta.env.VITE_APP_API_URL;

  const increment = () => setModalQuantity((q) => q + 1);
  const decrement = () => setModalQuantity((q) => (q > 1 ? q - 1 : 1));

  const localName = getFoodName(selectedFood, language);
  const localDesc = getFoodDescription(selectedFood, language);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-in fade-in duration-200">
      <div className="rounded-2xl p-6 sm:p-8 w-full max-w-lg bg-white shadow-2xl relative select-none border border-gray-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="pr-8 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            {localName}
          </h2>
          {selectedFood.category && (
            <span className="text-xs font-semibold text-[#4B7318] uppercase tracking-wider">
              {selectedFood.category}
            </span>
          )}
        </div>

        {/* Food Image Stage */}
        <div className="relative w-full h-52 sm:h-60 rounded-xl mb-6 overflow-hidden bg-[#F4F4F4] border border-gray-200/60 flex items-center justify-center p-4">
          <img
            src={
              selectedFood.image?.startsWith("http")
                ? selectedFood.image
                : selectedFood.image
                ? `${url}${selectedFood.image}`
                : assets.altimg
            }
            alt={localName}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(selectedFood.rating || 5)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-100"
                }
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-500">
            ({selectedFood.rating ? selectedFood.rating.toFixed(1) : "5.0"})
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {localDesc || "The perfect blend of authentic flavor and freshness."}
        </p>

        {/* Controls & Checkout Area */}
        <div className="space-y-5 pt-4 border-t border-gray-200">
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t("modal_select_qty") || "Select Quantity"}
            </span>
            <div className="flex items-center gap-3 bg-[#F4F4F4] p-1.5 rounded-lg border border-gray-200">
              <button
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-black font-bold shadow-sm hover:bg-gray-100 transition active:scale-90 cursor-pointer disabled:opacity-50"
                disabled={modalQuantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-bold text-black min-w-[24px] text-center">
                {modalQuantity}
              </span>
              <button
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-[#4B7318] text-white font-bold shadow-sm hover:bg-[#3d5e13] transition active:scale-90 cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="block text-xs font-medium text-gray-400">
                {t("modal_total_price") || "Total Price"}
              </span>
              <span className="text-2xl font-extrabold text-[#4B7318]">
                {formatPrice(selectedFood.price * modalQuantity)}
              </span>
            </div>

            <button
              onClick={onAddToCart}
              className="flex items-center gap-2 bg-[#4B7318] hover:bg-[#3d5e13] text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-md active:scale-95 cursor-pointer text-sm"
            >
              <ShoppingBag size={18} />
              <span>{t("modal_add_to_cart") || "Add to Cart"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FoodModal;