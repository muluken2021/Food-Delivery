import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SearchBar from "../component/Searchbar";
import { ThemeContext2 } from "../context/ThemeContext2";

const List = () => {
  const { isDark } = useContext(ThemeContext2);
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/food/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setFoods(data.foods);
      else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else toast.error("Failed to fetch food items");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const deleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/food/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchFoods();
      } else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`p-4 sm:p-6 md:p-10 rounded-xl shadow-md flex flex-col space-y-2 h-[calc(100vh-80px)] transition-colors ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
       <h4 className="text-2xl sm:text-3xl font-bold text-yellow-600">Food Lists</h4>
         
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or category..."
        />
      </div>
      

      {/* Food Items Scrollable */}
      <div className={`flex-1 overflow-y-auto space-y-3`}>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              className={`flex flex-col sm:grid sm:grid-cols-6 gap-4 items-start sm:items-center p-4 rounded-lg shadow hover:shadow-lg transition-colors ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={food.image ? `${url}${food.image}` : assets.upload}
                  alt={food.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Name */}
              <p className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>
                {food.name}
              </p>

              {/* Category */}
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"} capitalize`}>
                {food.category}
              </p>

              {/* Price */}
              <p className={`${isDark ? "text-green-400" : "text-green-600"} font-semibold`}>
                ${food.price}
              </p>

              {/* Actions: Edit & Delete */}
              <div className="flex gap-4 mt-2 sm:mt-0">
                <Link
                  to={`/admin/edit/${food._id}`}
                  className={`flex justify-center items-center transition-colors ${
                    isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <FiEdit size={20} />
                </Link>
                <button
                  onClick={() => deleteFood(food._id)}
                  className={`flex justify-center items-center transition-colors ${
                    isDark ? "text-red-500 hover:text-red-400" : "text-red-500 hover:text-red-700"
                  }`}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-center py-4`}>
            No food items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
