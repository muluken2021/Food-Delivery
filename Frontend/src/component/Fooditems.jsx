import React, { useContext, useState } from 'react'
import { assets} from '../assets/assets'

import { StoreContext } from '../context/StoreContext';

const Fooditems = ({catagory }) => {
    const {food_list} = useContext(StoreContext)
    
    const {cartItems, setCartItems, addtocart, removeFromCart} = useContext(StoreContext)

  return (
    <div className='container'>
        <hr className='mx-24 my-8 text-gray-500'/>
       <div className="food_list grid  mx-24 grid-cols-4 gap-12">
        
        {
            food_list.map((food, index) => {

                if(catagory==food.category || catagory=='All'){
                return (
                    <div key={index} className="food ">
                        
                        <img src={food.image} alt="" />
                        
                        {!cartItems[food._id] ? <img onClick={()=> addtocart(food._id)} src={assets.add_icon_white}></img>:
                         <div className='flex gap-4 py-4'>
                            <img onClick={()=> addtocart(food._id)} src={assets.add_icon_green}></img>
                            {cartItems[food._id]}
                            <img onClick={()=> removeFromCart(food._id)} src={assets.remove_icon_red}></img>
                         </div>
                        }
                        <div className="flex justify-between py-3">
                            <h1 className='text-lg font-medium'>{food.name}</h1>
                            <img src={assets.rating_starts} alt="" />
                        </div>
                        
                        <p>{food.description}</p>
                    </div>
                    )
                 }

               
            })
        }
       </div>
    </div>
  )
}

export default Fooditems
