import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { ArrowLeft, Trash2 } from "lucide-react";
import { food_list as fallbackData } from "../assets/foodData";
import { useTranslation } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";

const Cart = ({ login, setLogin }) => {
  const { cartItems, removeFromCart, addtocart, TotalCartPrice, foodList } = useContext(StoreContext);
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_API_URL;
  const DeliveryFee = 2;

  const displayData = foodList && foodList.length > 0 ? foodList : fallbackData;
  const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setLogin(true);
      return;
    }
    navigate("/order");
  };

  const handleNofood = () => {
    toast.warning(t("cart_add_food_warning") || "Please add items to your cart before proceeding.");
  };

  const getImageUrl = (food) => {
    if (!food.image) return assets.upload;
    if (food.image.startsWith("http")) return food.image;
    return `${url}${food.image}`;
  };

  return (
    <div className="w-full bg-white select-none py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Back Link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#4B7318] transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>{t("cart_back_home") || "Back to Menu"}</span>
        </Link>

        {/* ===== EMPTY CART ===== */}
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
            <img
              src={assets.empitycart}
              alt="empty cart"
              className="w-48 h-48 mb-6 opacity-80 object-contain"
            />
            <h2 className="text-2xl font-bold text-black mb-2">
              {t("cart_empty_title") || "Your Cart is Empty"}
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {t("cart_empty_desc") || "Looks like you haven't added anything to your cart yet. Explore our delicious menu to satisfy your cravings!"}
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="px-8 py-3.5 rounded-lg bg-[#4B7318] hover:bg-[#3d5e13] text-white font-bold transition-all duration-200 shadow-md cursor-pointer"
            >
              {t("cart_go_to_menu") || "Explore Menu"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                {t("cart_heading") || "Your Shopping Cart"}
              </h1>

              {/* Desktop Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs uppercase tracking-wider font-bold text-gray-500">
                <p className="col-span-5">{t("cart_col_item") || "Item"}</p>
                <p className="col-span-2 text-center">{t("cart_col_price") || "Price"}</p>
                <p className="col-span-2 text-center">{t("cart_col_quantity") || "Quantity"}</p>
                <p className="col-span-2 text-center">{t("cart_col_total") || "Total"}</p>
                <p className="col-span-1 text-right">{t("cart_col_actions") || "Remove"}</p>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {Object.keys(cartItems).map((id) => {
                  if (cartItems[id] <= 0) return null;
                  const food = displayData.find((f) => String(f._id) === String(id));
                  if (!food) return null;

                  return (
                    <div
                      key={food._id}
                      className="bg-[#F4F4F4] rounded-xl p-4 transition-all duration-200 border border-gray-200/60"
                    >
                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5 flex items-center gap-4">
                          <img
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            src={getImageUrl(food)}
                            alt={food.name}
                          />
                          <div>
                            <p className="font-bold text-black text-sm">{food.name}</p>
                            <span className="text-xs text-gray-500 capitalize">{food.category}</span>
                          </div>
                        </div>
                        <p className="col-span-2 text-center text-sm font-medium text-gray-700">
                          {formatPrice(food.price)}
                        </p>
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => removeFromCart(food._id)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-black font-bold hover:bg-gray-100 transition cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-sm w-6 text-center">{cartItems[id]}</span>
                          <button
                            onClick={() => addtocart(food._id)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#4B7318] text-white font-bold hover:bg-[#3d5e13] transition cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <p className="col-span-2 text-center text-sm font-bold text-[#4B7318]">
                          {formatPrice(food.price * cartItems[id])}
                        </p>
                        <div className="col-span-1 flex justify-end">
                          <button
                            onClick={() => removeFromCart(food._id, true)}
                            className="p-2 text-gray-400 hover:text-red-500 transition cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="sm:hidden flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            src={getImageUrl(food)}
                            alt={food.name}
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-black text-base">{food.name}</h4>
                            <p className="text-xs text-gray-500 mb-2">{formatPrice(food.price)} each</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFromCart(food._id)}
                                  className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-black font-bold hover:bg-gray-100 transition"
                                >
                                  -
                                </button>
                                <span className="font-bold text-sm w-6 text-center">{cartItems[id]}</span>
                                <button
                                  onClick={() => addtocart(food._id)}
                                  className="w-7 h-7 flex items-center justify-center rounded-md bg-[#4B7318] text-white font-bold hover:bg-[#3d5e13] transition"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(food._id, true)}
                                className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
                              >
                                <Trash2 size={14} />
                                {t("cart_remove") || "Remove"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-200/60 flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">{t("cart_col_total") || "Total"}</span>
                          <span className="font-bold text-[#4B7318]">
                            {formatPrice(food.price * cartItems[id])}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#EAEAEA] rounded-2xl p-6 border border-gray-200/60 sticky top-24">
                <h2 className="text-xl font-bold text-black pb-4 border-b border-gray-300">
                  {t("cart_totals") || "Order Summary"}
                </h2>

                <div className="py-4 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{t("cart_subtotal") || "Subtotal"}</span>
                    <span className="font-semibold text-black">{formatPrice(TotalCartPrice())}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>{t("cart_delivery_fee") || "Delivery Fee"}</span>
                    <span className="font-semibold text-black">
                      {TotalCartPrice() > 0 ? formatPrice(DeliveryFee) : formatPrice(0)}
                    </span>
                  </div>

                  <hr className="border-gray-300 my-2" />

                  <div className="flex justify-between text-base font-bold text-black pt-1">
                    <span>{t("cart_total") || "Total"}</span>
                    <span className="text-[#4B7318]">
                      {TotalCartPrice() > 0 ? formatPrice(TotalCartPrice() + DeliveryFee) : formatPrice(0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={TotalCartPrice() > 0 ? handleCheckout : handleNofood}
                  className="w-full mt-4 py-3.5 bg-[#4B7318] hover:bg-[#3d5e13] text-white font-bold rounded-lg uppercase tracking-wider text-xs transition-all duration-200 shadow-md cursor-pointer active:scale-95"
                >
                  {t("cart_proceed_checkout") || "Proceed to Checkout"}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;