import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoreHorizontal, Trash2, CheckCircle, Search, Filter, Calendar, User, ShoppingBag } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else if (data.message === "Unauthorized") {
        handleLogout();
      } else {
        toast.error("Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      setOrders([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/admin/login"; 
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/order/status/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
        toast.success(`Order updated: ${status}`);
      }
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/order/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success("Order deleted");
      }
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items?.some((i) => i.food?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order List</h2>
          <p className="text-sm text-gray-400">Manage incoming restaurant orders</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search..."
              className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500/20 outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-brand-500 shadow-sm transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white md:rounded-[2rem] md:border md:border-gray-50 md:shadow-sm overflow-hidden">
        
        {/* DESKTOP TABLE (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[13px] uppercase tracking-wider border-b border-gray-50">
                <th className="px-6 py-5 font-bold">Details</th>
                <th className="px-6 py-5 font-bold">Customer</th>
                <th className="px-6 py-5 font-bold">Items</th>
                <th className="px-6 py-5 font-bold">Amount</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">{order.user?.name || "Guest"}</td>
                  <td className="px-6 py-5">
                    <div className="max-w-[200px]">
                      {order.items?.map((i, idx) => (
                        <p key={idx} className="text-xs text-gray-500 truncate">
                          <span className="font-bold text-brand-500">x{i.quantity}</span> {i.food?.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-extrabold text-gray-900">{order.totalPrice} ETB</td>
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {order.status !== "Delivered" && (
                        <button onClick={() => updateStatus(order._id, "Delivered")} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"><CheckCircle size={18} /></button>
                      )}
                      <button onClick={() => deleteOrder(order._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      <button className="p-2 text-gray-400"><MoreHorizontal size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW (Hidden on Desktop) */}
        <div className="md:hidden space-y-4 p-4 bg-gray-50/50">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-md">#{order._id.slice(-6).toUpperCase()}</span>
                  <div className="flex items-center gap-2 mt-2 text-gray-800 font-bold">
                    <User size={14} className="text-gray-400"/> {order.user?.name || "Guest"}
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                  <ShoppingBag size={14} /> Items Ordered
                </div>
                {order.items?.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{i.food?.name}</span>
                    <span className="font-bold text-gray-900">x{i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-xs text-gray-400">Total Amount</p>
                  <p className="text-lg font-extrabold text-gray-900">{order.totalPrice} ETB</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteOrder(order._id)} className="p-2.5 text-red-500 bg-red-50 rounded-xl">
                    <Trash2 size={18} />
                  </button>
                  {order.status !== "Delivered" && (
                    <button onClick={() => updateStatus(order._id, "Delivered")} className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-md shadow-brand-100">
                      <CheckCircle size={16} /> Deliver
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-20 text-center text-gray-400">No orders found.</div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Delivered": "bg-green-50 text-green-500",
    "Accepted": "bg-blue-50 text-blue-500",
    "Cancelled": "bg-red-50 text-red-500",
    "Food Processing": "bg-orange-50 text-orange-500",
    "Pending": "bg-yellow-50 text-yellow-600",
  };
  return (
    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold uppercase ${styles[status] || "bg-gray-50 text-gray-500"}`}>
      {status || "Processing"}
    </span>
  );
};

export default AdminOrders;