import React, { createContext, useState, useEffect } from 'react';
import { food_list as fallbackData } from "../assets/foodData"; // Import your fallback data

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]); 
  const url = import.meta.env.VITE_APP_API_URL;

  // ✅ Determine which data to use (Backend vs Fallback)
  // We define this at the top level so it can be used in helper functions
  const displayData = foodList && foodList.length > 0 ? foodList : fallbackData;

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await fetch(`${url}/api/food/all`);
      const data = await response.json();
     
      if (data.success && Array.isArray(data.foods)) {
        setFoodList(data.foods);
      } else if (Array.isArray(data)) {
        setFoodList(data);
      } else {
        console.error('Unexpected response format:', data);
        setFoodList([]); // fallback safe
      }
    } catch (err) {
      console.error('Error fetching food list:', err);
      setFoodList([]);
    }
  };

  // Load cart for logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || {};
      setCartItems(savedCart);
    } else {
      setCartItems({});
    }

    fetchFoodList();
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(newCart));
    }
  };

  // Add to cart with optional quantity
  const addtocart = (itemId, quantity = 1) => {
    const newCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + quantity,
    };
    setCartItems(newCart);
    saveCart(newCart);
  };

  // Remove from cart
  const removeFromCart = (itemId, removeAll = false) => {
    const newCart = { ...cartItems };
    if (removeAll || newCart[itemId] === 1) delete newCart[itemId];
    else newCart[itemId] -= 1;
    setCartItems(newCart);
    saveCart(newCart);
  };

  // ✅ Calculate total price using displayData (fallback aware)
  const TotalCartPrice = () => {
    let totalPrice = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        // Look in displayData so it finds the item even if backend is down
        const itemInfo = displayData.find((food) => String(food._id) === String(item));
        if (itemInfo) totalPrice += itemInfo.price * cartItems[item];
      }
    }
    return totalPrice;
  };

  const clearCart = () => {
    setCartItems({});
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      localStorage.removeItem(`cart_${user._id}`);
      localStorage.removeItem("cartItems"); 
    }
    console.log("Cart cleared from state and storage");
  };

  const ContextValue = {
    foodList,
    displayData, // Optional: You can export this so components don't have to define fallback themselves
    cartItems,
    addtocart,
    removeFromCart,
    TotalCartPrice,
    clearCart
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;