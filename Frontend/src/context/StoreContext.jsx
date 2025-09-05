import React, { createContext, useState } from 'react'
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    const addtocart= (itemId)=> {
      if(!cartItems[itemId]) {
        setCartItems((prev) => ({...prev,[itemId]:1}))
      }
      else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
    }

    const removeFromCart = (itemId) => {
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

   const TotalCartPrice = () => {
      let totalPrice= 0;
     
      for(let item in cartItems){
       
        if(cartItems[item]>0){
        let itemInfo = food_list.find((food)=> food._id === item)
        totalPrice += itemInfo.price * cartItems[item]
       }
        
      }
      return totalPrice;
   }



    const ContextValue = {
      food_list,
      cartItems,
      setCartItems,
      addtocart,
      removeFromCart,
      TotalCartPrice
      
    }
      return (
        <StoreContext.Provider  value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
      )
}


export default StoreContextProvider
