import React, { useEffect, useState } from "react";
import OrderCard from "../component/OrderCard"; 
import { Package, History, ShoppingBag } from "lucide-react";

const OrderManager = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const [activeTab, setActiveTab] = useState("active"); // "active" or "history"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${url}/api/orders/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, url]);

  // Logic to filter orders based on current view
  const activeOrders = orders.filter(o => o.status === "Pending" || o.status === "Accepted");
  const historyOrders = orders.filter(o => o.status === "Delivered" || o.status === "Canceled");
  
  const displayOrders = activeTab === "active" ? activeOrders : historyOrders;

  const removeOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to remove this record?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${url}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header & Internal Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
          <p className="text-sm text-gray-500">Manage your current and past purchases</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "active" ? "bg-white text-brand-500 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Package size={16} /> Active
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "history" ? "bg-white text-brand-500 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <History size={16} /> History
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />)}
          </div>
        ) : displayOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
               <ShoppingBag className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 font-medium">No {activeTab} orders found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {displayOrders.map((order) => (
              <OrderCard key={order._id} order={order} onRemove={removeOrder} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;