import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]); 
  const url = 'http://localhost:4000'; 

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

  const addtocart = (itemId) => {
    const newCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1
    };
    setCartItems(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemId, removeAll = false) => {
    const newCart = { ...cartItems };
    if (removeAll || newCart[itemId] === 1) delete newCart[itemId];
    else newCart[itemId] -= 1;
    setCartItems(newCart);
    saveCart(newCart);
  };

  const TotalCartPrice = () => {
    let totalPrice = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((food) => String(food._id) === String(item));
        if (itemInfo) totalPrice += itemInfo.price * cartItems[item];
      }
    }
    return totalPrice;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const ContextValue = {
    foodList,
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
