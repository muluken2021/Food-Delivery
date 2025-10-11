import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const Fooditems = ({ category, searchQuery }) => {
  const { foodList, cartItems, addtocart, removeFromCart } = useContext(StoreContext);

  const url = import.meta.env.VITE_APP_API_URL;

  if (!Array.isArray(foodList)) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Filter foods based on category and search query
  const filteredFoods = foodList.filter((food) => {
    const matchesCategory = category.toLowerCase() === "all" || food.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = searchQuery.trim() === "" || food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 sm:px-12">
      <hr className="border-gray-300" />

      <div className="sm:p-4 md:p-5 lg:p-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredFoods.map((food, index) => (
          <div
            key={food._id || index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={food.image ? `${url}${food.image}` : assets.upload}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Food Info */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg font-semibold text-gray-800">{food.name}</h1>
              </div>
              <p className="text-gray-600 text-sm flex-1">{food.description}</p>

              {/* Price + Cart Buttons row */}
              <div className="flex justify-between items-center mt-3">
                {/* Price */}
                <p className="text-gray-900 font-bold">${food.price}</p>

                {/* Cart Buttons */}
                {!cartItems[food._id] ? (
                  <img
                    onClick={() => addtocart(food._id)}
                    src={assets.add_icon_yellow}
                    className="w-8 h-8 cursor-pointer"
                  />
                ) : (
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow w-fit">
                    <img
                      onClick={() => addtocart(food._id)}
                      src={assets.add_icon_green}
                      className="w-6 h-6 cursor-pointer"
                    />
                    <span className="font-medium">{cartItems[food._id]}</span>
                    <img
                      onClick={() => removeFromCart(food._id)}
                      src={assets.remove_icon_red}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fooditems;
