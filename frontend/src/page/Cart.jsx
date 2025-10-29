import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeFromCart, addtocart, TotalCartPrice, foodList } =
    useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_API_URL;

  const DeliveryFee = 2;

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login to place an order!");
      return;
    }
    navigate("/order");
  };

  const handleNofood = () => {
    toast.warning("Add food to place an order!");
  };

  const bgClass = theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-100";
  const textMain = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const textSub = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  return (
    <div
      className={`mx-2 sm:mx-6 lg:mx-24 p-4 sm:p-10 ${bgClass} min-h-screen transition-colors duration-300`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-500">
        Your Cart
      </h1>

      {/* Desktop Header */}
      <div className="hidden sm:grid grid-cols-6 gap-2 font-semibold text-sm sm:text-base mb-2 text-yellow-500">
        <p>Item</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Actions</p>
      </div>
      <hr className="hidden sm:block border-yellow-500 mb-4" />

      {/* Cart Items */}
      <div className="space-y-4">
        {Object.keys(cartItems).map((id) => {
          if (cartItems[id] > 0) {
            const food = foodList.find((f) => String(f._id) === String(id));
            if (!food) return null;

            return (
              <div
                key={food._id}
                className={`border-1 border-gray-200 rounded-xl p-4 sm:p-3 flex flex-col sm:grid sm:grid-cols-6 gap-4 sm:gap-2 items-start  bg-white/5`}
              >
                {/* Desktop layout */}
                <div className="hidden sm:contents">
                  {/* Image */}
                  <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={
                      food.image
                        ? `${url}${food.image}`
                        : assets.upload
                    }
                    alt={food.name}
                  />

                  {/* Name */}
                  <p className={`${textMain} font-medium`}>{food.name}</p>

                  {/* Price */}
                  <p className={`${textSub}`}>${food.price}</p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(food._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      -
                    </button>
                    <span className={`${textMain} font-medium w-6 text-center`}>
                      {cartItems[id]}
                    </span>
                    <button
                      onClick={() => addtocart(food._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <p className={`${textMain} font-semibold`}>
                    ${(food.price * cartItems[id]).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(food._id, true)}
                    className="text-yellow-500 border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:text-white transition text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden w-full">
                  {/* Image */}
                  <img
                    className="w-24 h-24 object-cover rounded-md mb-2"
                    src={
                      food.image
                        ? `${url}${food.image}`
                        : assets.upload
                    }
                    alt={food.name}
                  />

                  {/* Name */}
                  <p className={`${textMain} font-semibold text-base mb-1`}>
                    {food.name}
                  </p>

                  {/* Price + Quantity */}
                  <div className="flex items-center justify-between mb-1">
                    <p className={`${textSub}`}>${food.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(food._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        -
                      </button>
                      <span
                        className={`${textMain} font-medium w-6 text-center`}
                      >
                        {cartItems[id]}
                      </span>
                      <button
                        onClick={() => addtocart(food._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <p className={`${textMain} font-semibold mb-2`}>
                    Total: ${(food.price * cartItems[id]).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(food._id, true)}
                    className="text-yellow-500 border border-yellow-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 hover:text-white transition w-fit"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Totals */}
      <div className="mt-12 sm:mt-16 w-full sm:w-1/2 lg:w-1/3 mx-auto sm:mx-0">
        <h2 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-500">
          Cart Totals
        </h2>

        <div className="flex justify-between py-1">
          <p className={textSub}>Subtotal</p>
          <p className="font-medium">{`$${TotalCartPrice()}`}</p>
        </div>
        <hr className={`border ${borderColor} my-2`} />

        <div className="flex justify-between py-1">
          <p className={textSub}>Delivery Fee</p>
          <p className="font-medium">
            {TotalCartPrice() > 0 ? `$${DeliveryFee}` : "$0"}
          </p>
        </div>
        <hr className={`border ${borderColor} my-2`} />

        <div className="flex justify-between py-1">
          <p className={`${textSub} font-medium`}>Total</p>
          <p className="font-semibold text-yellow-500">
            {TotalCartPrice() > 0 ? `$${TotalCartPrice() + DeliveryFee}` : "$0"}
          </p>
        </div>

        <button
          onClick={TotalCartPrice() > 0 ? handleCheckout : handleNofood}
          className="w-full mt-5 border-2 border-yellow-500 rounded py-3 uppercase cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
