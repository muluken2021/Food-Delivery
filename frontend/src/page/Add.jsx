import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { FiUploadCloud, FiInfo, FiTag, FiDollarSign, FiLayers } from "react-icons/fi";

const Add = ({ editId }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    type: "normal",
  });

  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    if (!editId) return;
    const token = localStorage.getItem("token");
    fetch(`${url}/api/food/${editId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          const { name, description, category, price, type, image: img } = resData.food;
          setData({ name, description, category, price, type: type || "normal" });
          setImage(img);
        }
      })
      .catch(() => toast.error("Failed to fetch food item"));
  }, [editId, url]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!editId && !image) return toast.error("Please upload an image.");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (image && typeof image !== "string") formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(editId ? `${url}/api/food/${editId}` : `${url}/api/food/add`, {
        method: editId ? "PUT" : "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.success) {
        if (!editId) setData({ name: "", description: "", category: "", price: "", type: "normal" });
        setImage(null);
        toast.success(result.message);
      } else {
        toast.error(result.message || "Action failed.");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const labelClass = "flex items-center gap-2 text-sm font-bold text-gray-700 mb-2";
  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-300";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{editId ? "Update Dish" : "Add New Dish"}</h2>
        <p className="text-sm text-gray-400">Fill in the details to {editId ? "update the existing" : "list a new"} menu item</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white rounded-[2rem] border border-gray-50 shadow-sm p-8 space-y-8">
        
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 hover:bg-gray-50 transition-colors group">
          <label className={labelClass}>
            <FiUploadCloud className="text-brand-500" /> Upload Food Image
          </label>
          <label htmlFor="image" className="cursor-pointer mt-2 text-center">
            <div className="relative">
              <img
                src={image ? (typeof image === "string" ? `${url}/images/${image}` : URL.createObjectURL(image)) : assets.upload}
                alt="upload"
                className="w-64 h-48 rounded-2xl object-cover shadow-theme border border-white group-hover:scale-[1.02] transition-transform"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity">
                <span className="text-white text-xs font-bold bg-brand-500 px-3 py-1 rounded-full">Change Photo</span>
              </div>
            </div>
          </label>
          <input id="image" type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="md:col-span-2">
            <label className={labelClass}><FiInfo size={16} /> Dish Name</label>
            <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder="e.g. Spicy Pepperoni Pizza" required className={inputClass} />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className={labelClass}><FiLayers size={16} /> Description</label>
            <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Tell us about the ingredients and taste..." required className={`${inputClass} h-32 resize-none`} />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}><FiTag size={16} /> Category</label>
            <select name="category" value={data.category} onChange={onChangeHandler} required className={inputClass}>
              <option value="">Select Category</option>
              <option value="burgers_sandwiches">Burgers & Sandwiches</option>
              <option value="pizza">Pizza</option>
              <option value="pasta">Pasta</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className={labelClass}><FiTag size={16} /> Status / Type</label>
            <select name="type" value={data.type} onChange={onChangeHandler} required className={inputClass}>
              <option value="normal">Standard Item</option>
              <option value="popular">Popular Choice</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}><FiDollarSign size={16} /> Price (ETB)</label>
            <input type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="0.00" required className={inputClass} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
          <button type="button" onClick={() => window.history.back()} className="px-8 py-3 rounded-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" className="px-10 py-3.5 rounded-2xl bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-100 hover:bg-brand-600 transition-all active:scale-95">
            {editId ? "Save Changes" : "Create Dish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;