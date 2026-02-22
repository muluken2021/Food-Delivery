import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../component/SearchBar";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      // FIX 1: URL changed to singular /api/order/all
      const res = await fetch(`${url}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // FIX 2: Backend now returns data.data instead of data.orders
      if (data.success) {
        setOrders(data.data);
      } else if (data.message === "Unauthorized") {
        handleLogout();
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    setOrders([]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      // FIX 3: Updated path to /api/order/status
      const res = await fetch(`${url}/api/order/status/${orderId}`, {
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
        handleLogout();
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
      const res = await fetch(`${url}/api/order/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success(data.message);
      } else if (data.message === "Unauthorized") {
        handleLogout();
      } else toast.error(data.message || "Failed to delete order");
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Something went wrong!");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(order.items) &&
        order.items.some((i) => 
          i.food?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <div className="p-6 bg-white text-gray-900 transition rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-orange-500">Admin Orders</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user or item..."
        />
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-180px)]">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <span className="font-semibold text-lg">{order.user?.name || "Unknown User"}</span>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-50 text-green-600" :
                    order.status === "Accepted" ? "bg-blue-50 text-blue-600" :
                    order.status === "Cancelled" ? "bg-red-50 text-red-600" :
                    "bg-orange-50 text-orange-600"
                  }`}
                >
                  {order.status || "Food Processing"}
                </span>
              </div>

              {/* FIX 4: Updated to handle populated food items */}
              <div className="text-gray-600 text-sm mb-3 space-y-1">
                {Array.isArray(order.items) && order.items.length > 0
                  ? order.items.map((i, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="font-bold text-gray-400">x{i.quantity}</span>
                        <span>{i.food?.name || "Deleted Item"}</span>
                      </div>
                    ))
                  : "No items"}
              </div>

              <div className="flex justify-between items-center flex-wrap gap-2 border-t pt-3">
                <span className="font-bold text-xl text-gray-800">${order.totalPrice || 0}</span>
                <div className="flex gap-2 flex-wrap">
                  {/* Status Buttons */}
                  {["Food Processing", "Pending"].includes(order.status) && (
                     <button onClick={() => updateStatus(order._id, "Accepted")} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Accept</button>
                  )}
                  <button onClick={() => updateStatus(order._id, "Delivered")} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Deliver</button>
                  <button onClick={() => updateStatus(order._id, "Cancelled")} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Cancel</button>
                  <button onClick={() => deleteOrder(order._id)} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-100 hover:text-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-10">No orders found matching your search.</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;