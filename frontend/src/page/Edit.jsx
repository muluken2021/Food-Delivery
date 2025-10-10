import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';



const Edit = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [food, setFood] = useState({
    name: '',
    description: '',
    category: 'salad',
    price: ''
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/api/food/all`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          const currentFood = data.foods.find(f => f._id === id);
          if (currentFood) {
            setFood({
              name: currentFood.name,
              description: currentFood.description,
              category: currentFood.category,
              price: currentFood.price
            });
            setImage(currentFood.image || null);
          }
        } else if (data.message === 'Unauthorized') {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
        } else {
          toast.error('Failed to fetch food data');
        }
      } catch {
        toast.error('Failed to fetch food data');
      }
    };

    fetchFood();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('description', food.description);
    formData.append('category', food.category);
    formData.append('price', food.price);
    if (image instanceof File) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/api/food/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Food updated successfully');
        navigate('/admin/list');
      } else if (data.message === 'Unauthorized') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl  bg-gray-50 rounded-xl shadow-lg">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Image Upload */}
        <div className="text-left">
          <h4 className="py-2 text-black-700 font-semibold">Upload Image</h4>
          <label htmlFor="image">
            <img
              src={
                image instanceof File
                  ? URL.createObjectURL(image)
                  : image
                  ? `http://localhost:4000/images/${image}`
                  : assets.upload
              }
              className={`cursor-pointer w-40 h-32 border-2 rounded-lg object-cover transition ${
                !image ? 'border-red-400' : 'border-gray-400'
              }`}
              alt="upload"
            />
          </label>
          <input
            id="image"
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Food Name */}
        <div>
          <h4 className="py-2 text-black-700 font-medium">Product Name</h4>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <h4 className="py-2 text-black-700 font-medium">Product Description</h4>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full h-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
          />
        </div>

        {/* Category & Price */}
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="flex-1">
            <h4 className="py-2 text-black-700 font-medium">Food Category</h4>
            
             <select
                name="category"
                value={food.category}
                onChange={handleChange}
                className="border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
              >
                <option value="">Select Category</option>
                <option value="burgers_sandwiches">Burgers & Sandwiches</option>
                <option value="pizza">Pizza</option>
                <option value="pasta_noodles">Pasta & Noodles</option>
                <option value="fried_grilled">Fried & Grilled Specials</option>
                <option value="desserts_drinks">Desserts & Drinks</option>
              </select>

          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h4 className="py-2 text-black-700 font-medium">Price</h4>
            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-60 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
