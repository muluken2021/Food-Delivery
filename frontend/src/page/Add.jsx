// components/Add.jsx
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

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

  // Load existing food if editing
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
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          toast.error(resData.message || "Failed to fetch food item");
        }
      })
      .catch(() => toast.error("Failed to fetch food item"));
  }, [editId]);

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
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error(result.message || "Session expired. Please login again.");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const inputClass = `w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 transition`;
  const buttonClass = `px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md transition`;

  return (
    <div className="p-6 rounded-2xl shadow-lg max-w-4xl mx-auto bg-white">
      <form className="space-y-6" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div>
          <label className="block font-bold mb-2">{editId ? "Edit Food Item" : "Food Image"}</label>
          <label htmlFor="image" className="cursor-pointer inline-block">
            <img
              src={image ? (typeof image === "string" ? `${url}/images/${image}` : URL.createObjectURL(image)) : assets.upload}
              alt="upload"
              className="w-48 h-36 rounded-xl border-2 border-gray-300 object-cover hover:opacity-80 transition"
            />
          </label>
          <input id="image" type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder="Food name" required className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Food description" required className={`${inputClass} h-24 resize-none`} />
        </div>

        {/* Category & Type */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Category</label>
            <select name="category" value={data.category} onChange={onChangeHandler} required className={inputClass}>
              <option value="">Select</option>
              <option value="burgers_sandwiches">Burgers & Sandwiches</option>
              <option value="pizza">Pizza</option>
              <option value="pasta">Pasta</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Type</label>
            <select name="type" value={data.type} onChange={onChangeHandler} required className={inputClass}>
              <option value="normal">Normal</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="$20" required className={inputClass} />
        </div>

        {/* Submit */}
        <button type="submit" className={buttonClass}>
          {editId ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;