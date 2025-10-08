import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Trash2 } from "lucide-react";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:4000/api/orders/user/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Only delivered orders
            setHistory(data.orders.filter((o) => o.status === "Delivered"));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Remove this order?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setHistory((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="mx-4 sm:mx-8 lg:mx-24 p-4 sm:p-10 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        <Link to="/orderpage">
          <h3 className="text-xl sm:text-xl font-bold text-gray-500 pb-2 hover:text-yellow-500 transition">
            My Orders
          </h3>
        </Link>
        <Link to="/orderhistory">
          <h3 className="text-xl sm:text-xl font-bold text-yellow-500 pb-2 border-b-2 border-yellow-400 hover:text-yellow-700 transition">
            Order History
          </h3>
        </Link>
      </div>

      {/* Delivered Orders */}
      {history.length === 0 ? (
        <p className="text-gray-600">No delivered orders yet.</p>
      ) : (
        <div className="space-y-6">
          {history.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="text-gray-600 font-mono text-sm">{order._id}</span>
              </div>

              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.food._id} className="flex justify-between py-2">
                    <span className="font-medium">{item.food.name} x{item.quantity}</span>
                    <span className="font-semibold">${item.food.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-bold text-gray-800 text-lg">
                <span>Total:</span>
                <span>${order.totalPrice}</span>
              </div>

              {/* Status and Delete button */}
              <div className="flex justify-between items-center mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-5 h-5 inline mr-1" /> Delivered
                </span>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition"
                >
                  <Trash2 className="w-5 h-5 mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
