import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PlusCircle, List, Users, ShoppingCart } from 'lucide-react' // Lucide icons

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  const menuItems = [
    { name: 'Add Food', icon: <PlusCircle className="w-6 h-6" />, path: '/admin/add' },
    { name: 'List Items', icon: <List className="w-6 h-6" />, path: '/admin/list' },
    { name: 'Users', icon: <Users className="w-6 h-6" />, path: '/admin/users' },
    { name: 'Orders', icon: <ShoppingCart className="w-6 h-6" />, path: '/admin/orders' },
  ]

  const location = useLocation()

  return (
    <aside
      className={`bg-teal-50 border-r border-teal-200 min-h-screen px-4 py-6 sm:w-64 w-64 sm:block mt-16 sm:mt-0
      ${menuOpen ? 'fixed top-0 left-0 z-50 w-64 h-full shadow-lg mt-16 sm:mt-0' : 'hidden sm:block'}`}
    >
      {/* Close button for mobile */}
      <div className="sm:hidden flex justify-end mb-6">
        <button
          onClick={() => setMenuOpen(false)}
          className="text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path
        return (
          <Link key={index} to={item.path} onClick={() => setMenuOpen(false)}>
            <div
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg cursor-pointer transition duration-200
                ${isActive 
                  ? 'bg-yellow-500 text-white' 
                  : 'hover:bg-yellow-100 text-teal-800 hover:text-yellow-500'
                }`}
            >
              {item.icon}
              <h3 className="font-medium">{item.name}</h3>
            </div>
          </Link>
        )
      })}
    </aside>
  )
}

export default Sidebar
