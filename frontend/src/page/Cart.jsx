import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { ArrowLeft, ShoppingBasket } from "lucide-react"; // optional icon (recommended)

const Cart = ({login, setLogin}) => {
  const { cartItems, removeFromCart, addtocart, TotalCartPrice, foodList } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_API_URL;

  const DeliveryFee = 2;

  // ✅ Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setLogin(true)
      return;
    }
    navigate("/order");
  };

  const handleNofood = () => {
    toast.warning("Add food to place an order!");
  };

  return (
    <div className="mx-2 sm:mx-6 lg:mx-24 p-4 my-20 min-h-screen bg-white transition ">
     
      {isCartEmpty ? (
        <Link to='/' >
          <div className="flex gap-2 text-gray-800 hover:text-brand-700 hover:scale-101"> 
            <ArrowLeft />
            <h1>Back to home </h1>
          </div>
        </Link>
      )   
      : 
      "" }

      {/* ================= EMPTY CART ================= */}
      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          
          
          <img
            src={assets.empitycart}
            alt="empty cart"
            className="w-62 h-62 mb-6 opacity-80"
          />

          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="px-8 py-3 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition"
          >
            Go To Menu
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700">
            Your Cart
          </h1>
          {/* ================= DESKTOP HEADER ================= */}
          <div className="hidden sm:grid grid-cols-6 gap-2 font-semibold text-sm sm:text-base mb-2 text-gray-700">
            <p>Item</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Actions</p>
          </div>

          <hr className="hidden sm:block border-brand-500 mb-4" />

          {/* ================= CART ITEMS ================= */}
          <div className="space-y-4">
            {Object.keys(cartItems).map((id) => {
              if (cartItems[id] > 0) {
                const food = foodList.find(
                  (f) => String(f._id) === String(id)
                );
                if (!food) return null;

                return (
                  <div
                    key={food._id}
                    className="bg-white shadow-md rounded-2xl p-4 sm:p-3 flex flex-col sm:grid sm:grid-cols-6 gap-4 sm:gap-2 items-start"
                  >
                    {/* DESKTOP LAYOUT */}
                    <div className="hidden sm:contents">
                      <img
                        className="w-20 h-20 object-cover rounded-xl"
                        src={food.image ? `${url}${food.image}` : assets.upload}
                        alt={food.name}
                      />

                      <p className="font-medium text-gray-900">
                        {food.name}
                      </p>

                      <p className="text-gray-600">${food.price}</p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(food._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition"
                        >
                          -
                        </button>

                        <span className="font-medium w-6 text-center">
                          {cartItems[id]}
                        </span>

                        <button
                          onClick={() => addtocart(food._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ${(food.price * cartItems[id]).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeFromCart(food._id, true)}
                        className="text-gray-700 border border-brand-500 px-3 py-1 rounded-xl hover:bg-brand-500 hover:text-white transition text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    {/* MOBILE LAYOUT */}
                    <div className="sm:hidden w-full">
                      <div className="flex gap-10">
                        <img
                          className="w-24 h-24 object-cover rounded-xl mb-2"
                          src={
                            food.image ? `${url}${food.image}` : assets.upload
                          }
                          alt={food.name}
                        />

                        <div className="space-y-3">
                          <p className="font-semibold text-gray-900 text-base mb-1">
                            {food.name}
                          </p>

                          <p className="text-gray-600">${food.price}</p>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(food._id)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition"
                            >
                              -
                            </button>

                            <span className="font-medium w-6 text-center">
                              {cartItems[id]}
                            </span>

                            <button
                              onClick={() => addtocart(food._id)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <p className="font-semibold text-gray-900 mb-2">
                          Total: $
                          {(food.price * cartItems[id]).toFixed(2)}
                        </p>

                        <button
                          onClick={() => removeFromCart(food._id, true)}
                          className="text-gray-700 border border-brand-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-500 hover:text-white transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* ================= CART TOTALS ================= */}
          <div className="mt-12 sm:mt-16 w-full sm:w-1/2 lg:w-1/3 mx-auto sm:mx-0">
            <h2 className="text-2xl sm:text-3xl font-bold py-4 text-gray-700">
              Cart Totals
            </h2>

            <div className="flex justify-between py-1">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">${TotalCartPrice()}</p>
            </div>

            <hr className="border-gray-300 my-2" />

            <div className="flex justify-between py-1">
              <p className="text-gray-600">Delivery Fee</p>
              <p className="font-medium">
                {TotalCartPrice() > 0 ? `$${DeliveryFee}` : "$0"}
              </p>
            </div>

            <hr className="border-gray-300 my-2" />

            <div className="flex justify-between py-1">
              <p className="font-medium text-gray-600">Total</p>
              <p className="font-semibold text-gray-700">
                {TotalCartPrice() > 0
                  ? `$${TotalCartPrice() + DeliveryFee}`
                  : "$0"}
              </p>
            </div>

            <button
              onClick={TotalCartPrice() > 0 ? handleCheckout : handleNofood}
              className="w-full mt-5 border-2 border-brand-500 rounded-xl py-3 uppercase cursor-pointer text-white bg-brand-500 hover:bg-brand-600 transition duration-300"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;