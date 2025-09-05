import React from 'react'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className=' border-r-1 mx-2 sidebar'>
     <div className="flex gap-5 border-1 border-r-0 my-5 ml-12 p-4 hover:bg-orange-100 cursor-pointer">
        <img src={assets.add} alt="" />
        <h3>Add Food</h3>
     </div>

      <div className="flex gap-5 border-1 border-r-0 my-5 ml-12 p-4 hover:bg-orange-100 cursor-pointer">
        <img src={assets.order} alt="" />
        <h3>List Items</h3>
     </div>

      <div className="flex gap-5 border-1 border-r-0 my-5 ml-12 p-4 hover:bg-orange-100 cursor-pointer">
        <img src={assets.order} alt="" />
        <h3>Orders</h3>
     </div>
      
    </div>
  )
}

export default Sidebar
