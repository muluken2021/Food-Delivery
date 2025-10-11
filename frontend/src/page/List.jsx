import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import SearchBar from '../component/Searchbar'


const List = () => {
  const [foods, setFoods] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${url}/api/food/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (data.success) setFoods(data.foods)
      else if (data.message === 'Unauthorized') {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        toast.error('Session expired. Please login again.')
      } else toast.error('Failed to fetch food items')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong!')
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const deleteFood = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${url}/api/food/${id}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` } 
      })
      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        fetchFoods()
      } else if (data.message === 'Unauthorized') {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        toast.error('Session expired. Please login again.')
      } else toast.error(data.message)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong!')
    }
  }

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.catagory?.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="mx-4  p-4 sm:p-10 bg-gray-100">

      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-yellow-600">Food List</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or category..."
        />
      </div>

      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-6 gap-2 text-yellow-600 font-semibold bg-gray-800 p-2 rounded-t-lg">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Edit</span>
        <span>Delete</span>
      </div>

      {/* Food Items */}
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food) => (
          <div
            key={food._id}
            className="grid grid-cols-6 gap-2 items-center py-2 text-sm sm:text-base bg-white hover:bg-yellow-50 transition rounded mb-1"
          >
            <p>
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                src={food.image ? `${url}${food.image}` : assets.upload}
                alt={food.name}
              />
            </p>
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>${food.price}</p>
            <Link
              to={`/admin/edit/${food._id}`}
              className="flex justify-center items-center text-teal-600 hover:text-teal-800 transition"
            >
              <FiEdit />
            </Link>
            <button
              onClick={() => deleteFood(food._id)}
              className="flex justify-center items-center text-red-500 hover:text-red-700 transition"
            >
              <FiTrash2 />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center py-4 text-gray-500">No food items found.</p>
      )}
    </div>
  )
}

export default List
