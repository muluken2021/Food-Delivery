import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, XCircle, ShoppingCart, Trash2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const statusStyles = {
  Pending: { text: "text-yellow-300", bg: "bg-yellow-900/30", icon: <Clock className="w-5 h-5 inline mr-1" /> },
  Accepted: { text: "text-blue-300", bg: "bg-blue-900/30", icon: <ShoppingCart className="w-5 h-5 inline mr-1" /> },
  Delivered: { text: "text-green-300", bg: "bg-green-900/30", icon: <CheckCircle className="w-5 h-5 inline mr-1" /> },
  Canceled: { text: "text-red-300", bg: "bg-red-900/30", icon: <XCircle className="w-5 h-5 inline mr-1" /> },
};

const OrderPage = () => {
  const { theme } = useContext(ThemeContext);
  const url = import.meta.env.VITE_APP_API_URL;
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user?._id) {
      const token = localStorage.getItem("token");
      fetch(`${url}/api/orders/user/${user._id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOrders(data.orders);
          else if (data.message === "Unauthorized") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
          }
        })
        .catch((err) => console.error(err));
    } else setOrders([]);
  }, [user]);

  const removeDeliveredOrder = async (orderId) => {
    if (!window.confirm("Remove this delivered order?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrders((prev) => prev.filter((o) => o._id !== orderId));
      else alert(data.message || "Failed to delete order");
    } catch (err) {
      console.error(err);
      alert("Error removing order");
    }
  };

  return (
    <div
      className={`mx-4 sm:mx-8 lg:mx-24 p-4 sm:p-10 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Tabs */}
      <div className={`flex space-x-6 border-b mb-6 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
        <Link to="/orderpage">
          <h3
            className={`text-xl sm:text-xl font-bold pb-2 border-b-2 transition ${
              theme === "dark"
                ? "border-yellow-500 text-yellow-400 hover:text-yellow-300"
                : "border-yellow-500 text-yellow-600 hover:text-yellow-500"
            }`}
          >
            My Orders
          </h3>
        </Link>
        <Link to="/orderhistory">
          <h3
            className={`text-xl sm:text-xl font-bold pb-2 transition ${
              theme === "dark" ? "text-gray-400 hover:text-yellow-400" : "text-gray-500 hover:text-yellow-500"
            }`}
          >
            Order History
          </h3>
        </Link>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition ${
                theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">{theme === "dark" ? "text-gray-300" : "text-gray-700"}Order ID:</span>
                <span className="font-mono text-sm">{order._id}</span>
              </div>

              <div className="divide-y divide-gray-700">
                {order.items.map((item) => (
                  <div key={item.food?._id || item._id} className="flex justify-between py-2">
                    <span className="font-medium">{item.food?.name || "Unknown Item"} x{item.quantity}</span>
                    <span className="font-semibold">${item.food?.price ? item.food.price * item.quantity : 0}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>${order.totalPrice}</span>
              </div>

              {/* Status and Delete button */}
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${
                    statusStyles[order.status]?.bg || "bg-gray-700"
                  } ${statusStyles[order.status]?.text || "text-gray-200"}`}
                >
                  {statusStyles[order.status]?.icon} {order.status}
                </span>

                {order.status === "Delivered" && (
                  <button
                    onClick={() => removeDeliveredOrder(order._id)}
                    className="flex items-center px-3 py-1 bg-red-700 text-red-300 rounded-full font-medium hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5 mr-1" /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
