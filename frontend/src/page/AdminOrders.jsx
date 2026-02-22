// components/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../component/Searchbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) setOrders(data.orders);
      else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        setOrders([]);
      } else {
        toast.error("Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Something went wrong!");
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/orders/status/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
        toast.success(`Order status updated to ${status}`);
      } else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Something went wrong!");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success(data.message);
      } else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else toast.error(data.message || "Failed to delete order");
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Something went wrong!");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(order.items) &&
        order.items.some((i) => i.food?.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="p-6 bg-white text-gray-900 transition rounded-2xl shadow-lg">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-brand-500">Admin Orders</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user or item..."
        />
      </div>

      {/* Orders: Card Layout */}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-140px)]">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <span className="font-semibold text-lg">{order.user?.name || "Unknown"}</span>
                <span
                  className={`text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : order.status === "Accepted"
                      ? "text-blue-500"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="text-gray-600 text-sm mb-2">
                {Array.isArray(order.items) && order.items.length > 0
                  ? order.items.map((i, idx) => (
                      <div key={idx}>
                        {i.food?.name || "Item"} x{i.quantity || 1}
                      </div>
                    ))
                  : "No items"}
              </div>

              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-medium text-green-500">${order.totalPrice || 0}</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateStatus(order._id, "Accepted")}
                    className="bg-brand-500 text-white px-3 py-1 rounded-xl hover:bg-brand-600 transition text-xs sm:text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition text-xs sm:text-sm"
                  >
                    Deliver
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "Cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-xl hover:bg-gray-600 transition text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-4">No orders available</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;