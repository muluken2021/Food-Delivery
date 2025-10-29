import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { ThemeContext2 } from "../context/ThemeContext2";

const Add = ({ editId }) => {
  const { isDark } = useContext(ThemeContext2);
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
    if (editId) {
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
          } else if (resData.message === "Unauthorized") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.error("Session expired. Please login again.");
          } else {
            toast.error("Failed to fetch food item");
          }
        })
        .catch(() => toast.error("Failed to fetch food item"));
    }
  }, [editId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!editId && !image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("type", data.type);
    if (image && typeof image !== "string") formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        editId ? `${url}/api/food/${editId}` : `${url}/api/food/add`,
        {
          method: editId ? "PUT" : "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      if (result.success) {
        if (!editId) setData({ name: "", description: "", category: "", price: "", type: "normal" });
        setImage(null);
        toast.success(result.message);
      } else if (result.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md max-w-7xl mx-auto transition-colors ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <form className="space-y-4" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div>
          <label className="block font-bold mb-2">
            {editId ? "Edit Food Item" : "Food Image"}
          </label>
          <label htmlFor="image" className="cursor-pointer inline-block">
            <img
              src={
                image
                  ? typeof image === "string"
                    ? `${url}/images/${image}`
                    : URL.createObjectURL(image)
                  : assets.upload
              }
              alt="upload"
              className={`w-40 h-32 rounded-lg border-2 object-cover hover:opacity-80 transition ${
                isDark ? "border-yellow-400" : "border-gray-400"
              }`}
            />
          </label>
          <input id="image" type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Food name"
            required
            className={`w-full p-2 border rounded-md focus:ring-2 transition ${
              isDark
                ? "border-gray-600 bg-gray-800 text-white focus:ring-yellow-300"
                : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-200"
            }`}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Food description"
            required
            className={`w-full p-2 border rounded-md h-20 resize-none focus:ring-2 transition ${
              isDark
                ? "border-gray-600 bg-gray-800 text-white focus:ring-yellow-300"
                : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-200"
            }`}
          />
        </div>

        {/* Category & Type */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
              className={`w-full p-2 border rounded-md focus:ring-2 transition ${
                isDark
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-yellow-300"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-200"
              }`}
            >
              <option value="">Select</option>
              <option value="burgers_sandwiches">Burgers & Sandwiches</option>
              <option value="pizza">Pizza</option>
              <option value="pasta">Pasta </option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={data.type}
              onChange={onChangeHandler}
              required
              className={`w-full p-2 border rounded-md focus:ring-2 transition ${
                isDark
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-yellow-300"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-200"
              }`}
            >
              <option value="normal">Normal</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            placeholder="$20"
            required
            className={`w-full p-2 border rounded-md focus:ring-2 transition ${
              isDark
                ? "border-gray-600 bg-gray-800 text-white focus:ring-yellow-300"
                : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-200"
            }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`mt-2 px-6 py-2 rounded-md shadow-sm font-semibold transition ${
            isDark
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
