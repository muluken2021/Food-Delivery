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

  // Filter orders by user name or item name
  const filteredOrders = orders.filter(
    (order) =>
      order.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(order.items) &&
        order.items.some((i) => i.food?.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-yellow-600">Admin Orders</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user or item..."
        />
      </div>

      {/* Table for desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left text-yellow-600 font-semibold">User</th>
              <th className="p-3 text-left text-yellow-600 font-semibold">Items</th>
              <th className="p-3 text-left text-yellow-600 font-semibold">Total</th>
              <th className="p-3 text-left text-yellow-600 font-semibold">Status</th>
              <th className="p-3 text-left text-yellow-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="bg-white border-b hover:bg-yellow-50 transition">
                  <td className="p-3">{order.user?.name || "Unknown"}</td>
                  <td className="p-3">
                    {Array.isArray(order.items) && order.items.length > 0
                      ? order.items.map((i, idx) => (
                          <div key={idx}>
                            {i.food?.name || "Item"} x{i.quantity || 1}
                          </div>
                        ))
                      : "No items"}
                  </td>
                  <td className="p-3">${order.totalPrice || 0}</td>
                  <td className="p-3">{order.status || "Pending"}</td>
                  <td className="p-3 flex gap-2 flex-wrap">
                    <button
                      onClick={() => updateStatus(order._id, "Accepted")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      Deliver
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "Cancelled")}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-yellow-50 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {order.user?.name || "Unknown"}
                </span>
                <span className="text-gray-600 text-sm">{order.status || "Pending"}</span>
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
                <span className="font-medium">${order.totalPrice || 0}</span>
                <div className="flex gap-1 flex-wrap">
                  <button
                    onClick={() => updateStatus(order._id, "Accepted")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition text-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "Delivered")}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition text-xs"
                  >
                    Deliver
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "Cancelled")}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center">No orders available</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
