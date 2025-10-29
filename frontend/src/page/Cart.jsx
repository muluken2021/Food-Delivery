import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, addtocart, TotalCartPrice, foodList } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  
  const DeliveryFee = 2;
  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login to place an order!");
      return;
    }
    navigate('/order');
  };

  const handleNofood = () => {
    toast.warning("Add food to place an order!");
  };

  const bgClass = theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-100";
  const textMain = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const textSub = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  return (
    <div className={`mx-4 sm:mx-8 lg:mx-24 p-4 sm:p-10 ${bgClass} transition-colors duration-300`}>

      {/* Table Header */}
      <div className="title mb-4">
        <ul className={`grid grid-cols-6 gap-2 font-semibold text-sm sm:text-base ${textSub}`}>
          <li>Item</li>
          <li>Name</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>Actions</li>
        </ul>
        <hr className={`mt-2 sm:mt-4 border-yellow-500`} />
      </div>

      {/* Cart Items */}
      {Object.keys(cartItems).map((id) => {
        if (cartItems[id] > 0) {
          const food = foodList.find((f) => String(f._id) === String(id));
          if (!food) return null;

          return (
            <div key={food._id} className="mb-4">
              <div className={`grid grid-cols-6 gap-2 items-center py-2 text-sm sm:text-base`}>
                {/* Image */}
                <p>
                  <img 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" 
                    src={food.image ? `http://localhost:4000${food.image}` : assets.upload}
                    alt={food.name} 
                  />
                </p>

                {/* Name */}
                <p className={`${textMain} font-medium`}>{food.name}</p>

                {/* Price */}
                <p className={textSub}>${food.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(food._id)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    -
                  </button>
                  <span className={`${textMain} font-medium w-6 text-center`}>{cartItems[id]}</span>
                  <button
                    onClick={() => addtocart(food._id)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    +
                  </button>
                </div>

                {/* Total */}
                <p className={`${textMain} font-semibold`}>${(food.price * cartItems[id]).toFixed(2)}</p>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(food._id, true)}
                  className="text-yellow-500 font-bold text-xl hover:text-yellow-700 transition"
                >
                  &times;
                </button>
              </div>
              <hr className={`border ${borderColor} mt-2`} />
            </div>
          )
        }
        return null;
      })}

      {/* Cart Totals */}
      <div className='mt-8 sm:mt-12 w-full sm:w-1/2 lg:w-1/3'>
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-500">Cart Totals</h1>
        <div className="flex justify-between py-1">
          <p className={textSub}>Subtotal</p>
          <p className="font-medium">{`$${TotalCartPrice()}`}</p>
        </div>
        <hr className={`border ${borderColor} my-2`} />
        <div className="flex justify-between py-1">
          <p className={textSub}>Delivery Fee</p>
          <p className="font-medium">{TotalCartPrice() > 0 ? `$${DeliveryFee}` : '$0'}</p>
        </div>
        <hr className={`border ${borderColor} my-2`} />
        <div className="flex justify-between py-1">
          <p className={`${textSub} font-medium`}>Total</p>
          <p className='font-semibold text-yellow-500'>
            {TotalCartPrice() > 0 ? `$${TotalCartPrice() + DeliveryFee}` : '$0'}
          </p>
        </div>
        <hr className={`border ${borderColor} my-2`} />

        <button
          onClick={TotalCartPrice() > 0 ? handleCheckout : handleNofood}
          className='w-full sm:w-auto border-2 border-yellow-500 rounded my-3 py-2 px-4 uppercase cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300'
        >
          Proceed To Checkout
        </button> 
      </div>
    </div>
  )
}

export default Cart;
