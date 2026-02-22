import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { ArrowLeft } from 'lucide-react';

const Edit = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [food, setFood] = useState({
    name: '',
    description: '',
    category: 'salad',
    price: '',
    type: 'normal',
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/api/food/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          const currentFood = data.foods.find(f => f._id === id);
          if (currentFood) {
            setFood({
              name: currentFood.name,
              description: currentFood.description,
              category: currentFood.category,
              price: currentFood.price,
              type: currentFood.type || 'normal'
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
    if (!image) return toast.error('Please upload an image.');

    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('description', food.description);
    formData.append('category', food.category);
    formData.append('price', food.price);
    formData.append('type', food.type);
    if (image instanceof File) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/api/food/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { Authorization: `Bearer ${token}` }
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

  const inputClass = `border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-brand-500`;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto rounded-xl shadow-xl bg-gray-50 text-gray-900 transition-colors">
      <button
        onClick={() => navigate('/admin/list')}
        className="flex mb-5 items-center space-x-2 text-lg font-medium text-brand-500 hover:text-brand-600 transition"
      >
        <ArrowLeft size={20} />
        <span>Back to list</span>
      </button>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="text-left">
          <h4 className="py-2 font-semibold text-brand-500">Upload Image</h4>
          <label htmlFor="image">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image ? `${url}${image}` : assets.upload}
              className={`cursor-pointer w-40 h-32 border-2 rounded-lg object-cover transition ${
                !image ? 'border-red-400' : 'border-gray-300'
              }`}
              alt={food.name || 'upload'}
            />
          </label>
          <input id="image" type="file" hidden onChange={e => setImage(e.target.files[0])} />
        </div>

        {/* Product Fields */}
        <div>
          <h4 className="py-2 font-medium text-brand-500">Product Name</h4>
          <input type="text" name="name" value={food.name} onChange={handleChange} className={inputClass} required />
        </div>

        <div>
          <h4 className="py-2 font-medium text-brand-500">Product Description</h4>
          <textarea name="description" value={food.description} onChange={handleChange} className={inputClass} rows={5} required />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="flex-1">
            <h4 className="py-2 font-medium text-brand-500">Food Category</h4>
            <select name="category" value={food.category} onChange={handleChange} className={inputClass} required>
              <option value="">Select</option>
              <option value="burgers_sandwiches">Burgers & Sandwiches</option>
              <option value="pizza">Pizza</option>
              <option value="pasta">Pasta</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h4 className="pb-1 font-medium text-brand-500">Type</h4>
            <select name="type" value={food.type} onChange={handleChange} className={inputClass} required>
              <option value="normal">Normal</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h4 className="py-2 font-medium text-brand-500">Price</h4>
            <input type="number" name="price" value={food.price} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-60 py-2 px-4 bg-brand-500 text-white font-semibold rounded-lg shadow-md hover:bg-brand-600 transition disabled:opacity-50"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;