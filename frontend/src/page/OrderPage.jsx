import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, XCircle, ShoppingCart, Trash2 } from "lucide-react";

const statusStyles = {
  Pending: { text: "text-yellow-800", bg: "bg-yellow-100", icon: <Clock className="w-5 h-5 inline mr-1" /> },
  Accepted: { text: "text-blue-800", bg: "bg-blue-100", icon: <ShoppingCart className="w-5 h-5 inline mr-1" /> },
  Delivered: { text: "text-green-800", bg: "bg-green-100", icon: <CheckCircle className="w-5 h-5 inline mr-1" /> },
  Canceled: { text: "text-red-800", bg: "bg-red-100", icon: <XCircle className="w-5 h-5 inline mr-1" /> },
};

const OrderPage = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user?._id) {
      const token = localStorage.getItem("token");
      fetch(`${url}/api/orders/user/${user._id}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
    <div className="mx-4 sm:mx-8 lg:mx-24 p-4 sm:p-10 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        <Link to="/orderpage">
          <h3 className="text-xl sm:text-xl font-bold text-yellow-500 pb-2 border-b-2 border-yellow-500 hover:text-yellow-600 transition">
            My Orders
          </h3>
        </Link>
        <Link to="/orderhistory">
          <h3 className="text-xl sm:text-xl font-bold text-gray-500 pb-2 hover:text-yellow-500 transition">
            Order History
          </h3>
        </Link>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="text-gray-600 font-mono text-sm">{order._id}</span>
              </div>

              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.food?._id || item._id} className="flex justify-between py-2">
                    <span className="font-medium">{item.food?.name || "Unknown Item"} x{item.quantity}</span>
                    <span className="font-semibold">${item.food?.price ? item.food.price * item.quantity : 0}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-bold text-gray-800 text-lg">
                <span>Total:</span>
                <span>${order.totalPrice}</span>
              </div>

              {/* Status and Delete button */}
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${statusStyles[order.status]?.bg || "bg-gray-200"} ${statusStyles[order.status]?.text || "text-gray-800"}`}
                >
                  {statusStyles[order.status]?.icon} {order.status}
                </span>

                {order.status === "Delivered" && (
                  <button
                    onClick={() => removeDeliveredOrder(order._id)}
                    className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition"
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
  