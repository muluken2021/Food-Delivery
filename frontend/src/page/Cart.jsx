import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, TotalCartPrice, foodList } = useContext(StoreContext);
  const url = import.meta.env.VITE_APP_API_URL;
  const DeliveryFee = 2;
  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login to place an order!");
      return;
    }
    navigate('/order'); // navigate only if user is logged in
  };

  const handleNofood = () => {
    toast.warning("Add food to place an order!")
  }

  return (
    <div className='mx-4 sm:mx-8 lg:mx-24 p-4 sm:p-10 bg-gray-100'>
      
      {/* Table Header */}
      <div className="title">
        <ul className='grid grid-cols-6 gap-2 text-gray-500 font-semibold text-sm sm:text-base'>
          <li>Item</li>
          <li>Name</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>Remove</li>
        </ul>
        <hr className='mt-2 sm:mt-4 border-yellow-500'/>
      </div>

      {/* Cart Items */}
      {Object.keys(cartItems).map((id) => {
        if (cartItems[id] > 0) {
          const food = foodList.find((f) => String(f._id) === String(id));
          if (!food) return null;

          return (
            <div key={food._id}>
              <div className="grid grid-cols-6 gap-2 items-center py-2 text-sm sm:text-base">
                <p>
                  <img 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" 
                    src={food.image ? `${url}${food.image}` : assets.upload}
                    alt={food.name} 
                  />
                </p>
                <p className="text-gray-800 font-medium">{food.name}</p>
                <p className="text-gray-700">${food.price}</p>
                <p className="text-gray-700">{cartItems[id]}</p>
                <p className="text-gray-800 font-semibold">${food.price * cartItems[id]}</p>
                <button
                  onClick={() => removeFromCart(food._id)}
                  className="text-gray-500 hover:text-yellow-500 text-lg sm:text-xl transition-colors"
                >
                  &times;
                </button>
              </div>
              <hr className='border-gray-300'/>
            </div>
          )
        }
        return null;
      })}

      {/* Cart Totals */}
      <div className='mt-8 sm:mt-12 w-full sm:w-1/2 lg:w-1/3'>
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-500">Cart Totals</h1>
        <div className="flex justify-between py-1">
          <p>Subtotal</p>
          <p className="font-medium">${TotalCartPrice()}</p>
        </div>
        <hr className='border-gray-300 my-2'/>
        <div className="flex justify-between py-1">
          <p>Delivery Fee</p>
          <p className="font-medium">${TotalCartPrice() > 0 ? DeliveryFee : '0'}</p>
        </div>
        <hr className='border-gray-300 my-2'/>
        <div className="flex justify-between py-1">
          <p className='font-medium'>Total</p>
          <p className='font-semibold text-yellow-500'>
            ${TotalCartPrice() > 0 ? TotalCartPrice() + DeliveryFee : '0'}
          </p>
        </div>
        <hr className='border-gray-300 my-2'/>

        <button
          onClick={TotalCartPrice() > 0 ? handleCheckout: handleNofood}
          className='w-full sm:w-auto border-2 border-yellow-500 rounded my-3 py-2 px-4 uppercase cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300'
        >
          Proceed To Checkout
        </button> 
      </div>
    </div>
  )
}

export default Cart;
