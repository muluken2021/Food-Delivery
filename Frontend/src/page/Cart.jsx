import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { food_list } from '../assets/assets'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {cartItems, addtocart, removeFromCart, TotalCartPrice} = useContext(StoreContext)
  const DeliveryFee = 2;
  return (
    <div className='mx-24 p-10 bg-gray-100'>
      <div className=" title">
          
          <ul className='grid grid-cols-6 text-gray-500'>
          <li>Item</li>
          <li>Name</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>Remove</li>

        </ul>
        <hr className='mt-4 text-orange-300'/>
      </div>

     {food_list.map((food)=> {

      if(cartItems[food._id]>0){
        return (
          <div >
           <div className="grid grid-cols-6 py-2">
            <p><img class="w-15 h-10" src={food.image} alt="" /></p>
            <p>{food.name}</p>
            <p>${food.price}</p>
            <p>{cartItems[food._id]}</p>
            <p>{food.price * cartItems[food._id] }</p>
        <button
          onClick={() => removeFromCart(food._id)}
          className=" text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

           </div>
           <hr className='text-gray-400'/>
          </div>
        )
      }
     })}
      
     <div>
      <div className='mt-12 w-100'>
        <h1 className="text-2xl font-bold py-4">Cart Totals</h1>
        <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${TotalCartPrice()}</p>   
        </div>
        <hr className='text-gray-400 my-2'/>
         <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>
              ${
                TotalCartPrice() > 0 ? DeliveryFee : '0'
              }  
            </p>   
        </div>
        <hr className='text-gray-400 my-2'/>
         <div className="flex justify-between">
            <p className='font-medium'>Total</p>
            <p>${TotalCartPrice() > 0 ? TotalCartPrice() + DeliveryFee : '0' }</p>   
        </div>
         <hr className='text-gray-400 my-2'/>
        <Link to='/order'><button className='border-2 border-orange-500 rounded my-3 py-2 px-4 uppercase cursor-pointer text-white bg-orange-600 hover:bg-orange-500 '>Proceed To Checkout</button></Link> 
      </div>
     
     
     </div>
    </div>
  )
}

export default Cart
