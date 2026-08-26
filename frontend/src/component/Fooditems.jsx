import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { useTranslation } from "../context/LanguageContext";
import { getFoodName, getFoodDescription } from "../utils/foodLocale";
import { useCurrency } from "../context/CurrencyContext";
import { Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodModal from "./FoodModal";

const Fooditems = ({ category, searchQuery }) => {
  const { foodList, displayData, addtocart } = useContext(StoreContext);
  const { language, t } = useTranslation();
  const { formatPrice } = useCurrency();

  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery]);

  if (!Array.isArray(displayData) || (foodList.length === 0 && displayData.length === 0)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const filteredFoods = displayData.filter((food) => {
    const matchesCategory =
      category.toLowerCase() === "all" ||
      food.category.toLowerCase() === category.toLowerCase();

    const localName = getFoodName(food, language).toLowerCase();
    const englishName = food.name ? food.name.toLowerCase() : "";
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" || localName.includes(query) || englishName.includes(query);

    return matchesCategory && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handleAddToCart = () => {
    addtocart(selectedFood._id, modalQuantity);
    toast.success(`${getFoodName(selectedFood, language)} added to cart!`);
    setSelectedFood(null);
  };

  return (
    <div className="w-full">
      {/* Items Counter Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500 font-medium">
          Showing{" "}
          <span className="text-black font-bold">{currentItems.length}</span>{" "}
          of{" "}
          <span className="text-black font-bold">{filteredFoods.length}</span>{" "}
          items
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentItems.length > 0 ? (
          currentItems.map((food) => (
            <div
              key={food._id}
              onClick={() => {
                setSelectedFood(food);
                setModalQuantity(1);
              }}
              className="bg-black/3 rounded-2xl p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image Container */}
              <div className="w-full h-52 rounded-xl overflow-hidden mb-5">
                <img
                  src={
                    food.image?.startsWith("http")
                      ? food.image
                      : food.image
                      ? `${url}${food.image}`
                      : assets.altimg
                  }
                  alt={getFoodName(food, language)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = assets.altimg;
                  }}
                />
              </div>

              {/* Dish Name & Rating */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                  {getFoodName(food, language)}
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

              {/* Subtitle / Brand Info */}
              <p className="text-xs text-gray-400 font-medium mb-4">
                {food.category || "Al Karam"}
              </p>

              {/* Reviews Count */}
              <p className="text-xs text-gray-500 font-medium mb-4">
                (4.1k) Customer Reviews
              </p>

              {/* Price & Status Tag */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(food.price)}
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
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-base text-gray-500 font-medium italic">
              {t('popular_fetching')}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredFoods.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-full font-bold text-xs transition-all cursor-pointer ${
                currentPage === i + 1
                  ? "bg-[#4B7318] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Modal & Toasts */}
      {selectedFood && (
        <FoodModal
          selectedFood={selectedFood}
          modalQuantity={modalQuantity}
          setModalQuantity={setModalQuantity}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
          url={url}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar theme="dark" />
    </div>
  );
};

export default Fooditems;