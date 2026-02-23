import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch, FiTag, FiShoppingBag, FiInfo } from "react-icons/fi";

const List = () => {
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
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this delicious item?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/food/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Item removed");
        fetchFoods();
      }
    } catch (err) {
      toast.error("Error deleting item");
    }
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Food Menu</h2>
          <p className="text-sm text-gray-400">Manage your restaurant's dish availability</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 sm:flex-initial">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search dishes..."
              className="bg-white border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none shadow-sm w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/admin/add" className="bg-brand-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-100 hover:bg-brand-600 transition-all whitespace-nowrap">
            + Add New
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white md:rounded-[2rem] md:border md:border-gray-50 md:shadow-sm overflow-hidden">
        
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[13px] uppercase tracking-wider border-b border-gray-50">
                <th className="px-8 py-6 font-bold">Dish Preview</th>
                <th className="px-6 py-6 font-bold">Category</th>
                <th className="px-6 py-6 font-bold">Price</th>
                <th className="px-6 py-6 font-bold">Status</th>
                <th className="px-8 py-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFoods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={food.image ? `${url}${food.image}` : assets.upload}
                        alt={food.name}
                        className="w-16 h-16 object-cover rounded-2xl shadow-sm border border-gray-100"
                      />
                      <div>
                        <p className="font-bold text-gray-800 text-base">{food.name}</p>
                        <p className="text-xs text-gray-400">ID: {food._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-4 py-1.5 rounded-xl bg-brand-50 text-brand-500 text-xs font-bold capitalize">
                      {food.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-extrabold text-gray-900">
                    {food.price} <span className="text-[10px] text-gray-400 ml-1">ETB</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-gray-600">In Stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/edit/${food._id}`} className="p-2.5 bg-gray-50 text-brand-500 rounded-xl hover:bg-brand-500 hover:text-white transition-all shadow-sm">
                        <FiEdit size={16} />
                      </Link>
                      <button onClick={() => deleteFood(food._id)} className="p-2.5 bg-gray-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4 bg-gray-50/50">
          {filteredFoods.map((food) => (
            <div key={food._id} className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
              <div className="flex gap-4">
                <img
                  src={food.image ? `${url}${food.image}` : assets.upload}
                  className="w-24 h-24 rounded-xl object-cover shadow-sm"
                  alt={food.name}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{food.name}</h3>
                    <div className="flex gap-2">
                       <Link to={`/admin/edit/${food._id}`} className="p-2 text-brand-500 bg-brand-50 rounded-lg">
                        <FiEdit size={16} />
                      </Link>
                      <button onClick={() => deleteFood(food._id)} className="p-2 text-red-500 bg-red-50 rounded-lg">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-brand-50 text-brand-500 text-[10px] font-bold rounded-full uppercase">
                      {food.category}
                    </span>
                    <span className="text-[10px] text-gray-300 font-mono">#{food._id.slice(-6).toUpperCase()}</span>
                  </div>

                  <div className="flex justify-between items-end pt-1">
                     <p className="text-xl font-black text-gray-900">
                      {food.price} <span className="text-xs font-bold text-gray-400">ETB</span>
                    </p>
                    <div className="flex items-center gap-1.5 pb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="py-24 text-center">
            <div className="inline-flex p-5 rounded-full bg-gray-50 text-gray-300 mb-4">
              <FiShoppingBag size={40} />
            </div>
            <p className="text-gray-400 font-medium">No dishes found in your menu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;