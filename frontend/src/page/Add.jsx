import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'


const Add = ({ editId }) => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '', // use 'category' to match backend
    price: ''
  })


  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    if (editId) {
      const token = localStorage.getItem('token')
      fetch(`${url}/api/food/${editId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            const { name, description, category, price, image: img } = resData.food
            // map backend 'category' to local 'catagory'
            setData({ name, description, category: category, price })
            setImage(img)
          } else if (resData.message === 'Unauthorized') {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            toast.error('Session expired. Please login again.')
          } else {
            toast.error('Failed to fetch food item')
          }
        })
        .catch(() => toast.error('Failed to fetch food item'))
    }
  }, [editId])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Require image if adding a new item
    if (!editId && !image) {
      toast.error("Please upload an image before submitting.")
      return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('category', data.category) // keep backend field consistent
    formData.append('price', data.price)
    if (image && typeof image !== 'string') formData.append('image', image)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        editId ? `${url}/api/food/${editId}` : `${url}/api/food/add`,
        {
          method: editId ? 'PUT' : 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const result = await response.json()
      if (result.success) {
        // reset form only if adding new item
        if (!editId) setData({ name: '', description: '', catagory: '', price: '' })
        setImage(null)
        toast.success(result.message)
      } else if (result.message === "Unauthorized") {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        toast.error('Session expired. Please login again.')
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-white rounded-xl shadow-lg max-w-3xl">
      <form className="space-y-6" onSubmit={onSubmitHandler}>

        {/* Image Upload */}
        <div className="text-left">
          <h4 className="py-4 font-bold text-xl text-gray-800">
            {editId ? 'Edit Food Item' : 'Upload Image'}
          </h4>
          <label htmlFor="image" className="block w-fit mx-auto">
            <img
              src={image ? (typeof image === 'string' ? `${url}/images/${image}` : URL.createObjectURL(image)) : assets.upload}
              className="cursor-pointer w-44 h-36 mx-auto rounded-lg border-4 border-yellow-400 object-cover hover:opacity-80 transition"
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            type="file"
            hidden
          />
        </div>

        {/* Name */}
        <div>
          <h4 className="pb-1 font-semibold text-gray-700">Product Name</h4>
          <input
            onChange={onChangeHandler}
            value={data.name}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-sm"
            type="text"
            name="name"
            placeholder="Product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <h4 className="pb-1 font-semibold text-gray-700">Product Description</h4>
          <textarea
            onChange={onChangeHandler}
            name="description"
            value={data.description}
            className="border border-gray-300 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-sm"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Category & Price */}
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="flex-1">
            <h4 className="pb-1 font-semibold text-gray-700">Food Category</h4>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-sm"
              required
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
            <h4 className="pb-1 font-semibold text-gray-700">Product Price</h4>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-sm"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-60 py-3 px-6 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300 mt-4"
        >
          {editId ? 'Update' : 'Add'}
        </button>

      </form>
    </div>
  )
}

export default Add
