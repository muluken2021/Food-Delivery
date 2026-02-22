import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodModal from "./FoodModal";

const Fooditems = ({ category, searchQuery }) => {
  const { foodList, addtocart } = useContext(StoreContext);

  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [user, setUser] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const stobrandUser = localStorage.getItem("user");
    if (stobrandUser) setUser(JSON.parse(stobrandUser));
  }, []);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery]);

  if (!Array.isArray(foodList)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const filtebrandFoods = foodList.filter((food) => {
    const matchesCategory =
      category.toLowerCase() === "all" ||
      food.category.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === "" ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtebrandFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtebrandFoods.length / itemsPerPage);

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("You must be signed in to add items to cart!");
      return;
    }
    addtocart(selectedFood._id, modalQuantity);
    toast.success(`${selectedFood.name} added to cart!`);
    setSelectedFood(null);
  };

  return (
    <div className="w-full">
      {/* 1. Results Count */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{currentItems.length}</span> of <span className="text-gray-900 font-bold">{filtebrandFoods.length}</span> items
        </p>
      </div>

      {/* 2. Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((food) => (
              <div 
                key={food._id}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100/60 border border-gray-200 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="relative w-full h-44 rounded-xl mb-8 overflow-hidden shadow-gray-200">
                  <img
                    src={food.image ? `${url}${food.image}` : assets.altimg}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                    
                <div className="w-full">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-bold text-gray-900 text-left leading-tight truncate">
                      {food.name}
                    </h3>
                  </div>

                  <div className="flex gap-0.5 mb-4 justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.round(food.rating || 5) ? "#FFB800" : "none"} 
                        className={i < Math.round(food.rating || 5) ? "text-[#FFB800]" : "text-gray-200"}
                      />
                    ))}
                  </div>
                   <p className="text-gray-400 text-xs text-left line-clamp-2 max-w-[60%]">
                      {food.description || "The perfect blend of flavor and freshness."}
                    </p>

                  <div className="flex justify-between items-end mt-4">
                      <button 
                        onClick={() => {
                          setSelectedFood(food);
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
                      ${food.price}
                    </span>
                  </div>
                </div>
              </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-400 font-medium italic">
              "No foods found matching your criteria..."
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filtebrandFoods.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full font-bold transition-all ${
                currentPage === i + 1 
                ? "bg-brand-500 text-white" 
                : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 3. Modal & Toast */}
      {selectedFood && (
        <FoodModal
          selectedFood={selectedFood}
          modalQuantity={modalQuantity}
          setModalQuantity={setModalQuantity}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Fooditems;