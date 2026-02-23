import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { ArrowLeft, DollarSign, UploadCloud, FileInputIcon, Tag, Layers } from 'lucide-react';

const Edit = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [food, setFood] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    type: 'normal',
  });

  // Fetch initial data
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
          localStorage.clear();
          navigate('/login');
        }
      } catch {
        toast.error('Failed to load dish details');
      }
    };
    fetchFood();
  }, [id, url, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('description', food.description);
    formData.append('category', food.category);
    formData.append('price', food.price);
    formData.append('type', food.type);
    
    // Only append if it's a new file upload
    if (image instanceof File) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/api/food/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Dish updated successfully');
        navigate('/admin/list');
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Update failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood(prev => ({ ...prev, [name]: value }));
  };

  const labelClass = "flex items-center gap-2 text-sm font-bold text-gray-700 mb-2";
  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-300";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/admin/list')}
            className="group flex items-center gap-2 text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors mb-2"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Menu List
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Edit Dish Details</h2>
          <p className="text-sm text-gray-400">Modify the information for {food.name || 'this item'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-gray-50 shadow-sm p-8 space-y-8">
        
        {/* Image Edit Section */}
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 hover:bg-gray-50 transition-colors group">
          <label className={labelClass}>
            <UploadCloud className="text-brand-500" /> Replace Food Image
          </label>
          <label htmlFor="image" className="cursor-pointer mt-2 text-center">
            <div className="relative">
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image ? `${url}${image}` : assets.upload}
                className="w-64 h-48 rounded-2xl object-cover shadow-lg border border-white group-hover:scale-[1.02] transition-transform"
                alt="Food preview"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity">
                <span className="text-white text-xs font-bold bg-brand-500 px-4 py-1.5 rounded-full">Upload New</span>
              </div>
            </div>
          </label>
          <input id="image" type="file" hidden onChange={e => setImage(e.target.files[0])} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className={labelClass}><FileInputIcon size={16} /> Dish Name</label>
            <input type="text" name="name" value={food.name} onChange={handleChange} className={inputClass} required />
          </div>

          {/* Product Description */}
          <div className="md:col-span-2">
            <label className={labelClass}><Layers size={16} /> Description</label>
            <textarea name="description" value={food.description} onChange={handleChange} className={`${inputClass} h-32 resize-none`} required />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}><Tag size={16} /> Category</label>
            <select name="category" value={food.category} onChange={handleChange} className={inputClass} required>
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
            <label className={labelClass}><FileInputIcon size={16} /> Status / Type</label>
            <select name="type" value={food.type} onChange={handleChange} className={inputClass} required>
              <option value="normal">Standard Item</option>
              <option value="popular">Popular Choice</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}><DollarSign size={16} /> Price (ETB)</label>
            <input type="number" name="price" value={food.price} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
          <button 
            type="button" 
            onClick={() => navigate('/admin/list')} 
            className="px-8 py-3 rounded-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            Discard Changes
          </button>
          <button 
            type="submit" 
            className="px-10 py-3.5 rounded-2xl bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-100 hover:bg-brand-600 transition-all active:scale-95"
          >
            Update Dish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;