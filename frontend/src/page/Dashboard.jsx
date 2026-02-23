import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Package, Users, RefreshCcw, DollarSign, 
  ChevronDown, Calendar, Filter, MoreHorizontal, User, ShoppingBag, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [orderRes, userRes] = await Promise.all([
        fetch(`${url}/api/order/all`, { headers }),
        fetch(`${url}/api/user`, { headers })
      ]);

      const orderData = await orderRes.json();
      const userData = await userRes.json();

      if (orderData.success) setOrders(orderData.data);
      if (userData.success) setUsersCount(userData.users.length);
      
    } catch (err) {
      toast.error("Failed to sync dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
  const canceledOrders = orders.filter(o => o.status === "Cancelled").length;

  const summary = [
    { title: "Total Orders", value: orders.length, icon: <Package size={24} />, change: "+8%", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Total Revenue", value: `${totalRevenue.toLocaleString()} ETB`, icon: <DollarSign size={24} />, change: "+12%", color: "text-brand-500", bg: "bg-brand-50" },
    { title: "Active Users", value: usersCount, icon: <Users size={24} />, change: "+5%", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Canceled", value: canceledOrders, icon: <RefreshCcw size={24} />, change: "-2%", color: "text-red-500", bg: "bg-red-50" },
  ];

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading Analytics...</div>;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Business Overview</h1>
          <p className="text-sm text-gray-400">Real-time performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 shadow-sm">
            <Calendar size={14} className="text-brand-500" />
            Last 30 Days
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summary.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>{item.icon}</div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.change.includes("-") ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}>
                {item.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.title}</h3>
            <p className="text-xl font-black text-gray-800 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white md:rounded-xl md:border md:border-gray-50 md:shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200  items-center">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <Link to="/admin/orders">
               <button className="text-brand-500 text-sm font-bold hover:underline">View All</button>
            </Link>
          </div>
          <p className="text-gray-400">Here is recent  oredr list data</p>
        </div>
      

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className=" text-gray-900 text-[13px] uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 text-sm font-bold text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-gray-800">{order.user?.name || "Guest"}</p>
                    <p className="text-[11px] text-gray-400 uppercase font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">{order.items.length} Items</td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900">{order.totalPrice} ETB</td>
                  <td className="px-6 py-5"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-gray-300 hover:text-brand-500 transition-colors"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden divide-y divide-gray-100">
          {orders.slice(0, 5).map((order) => (
            <div key={order._id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <User size={20} />
                   </div>
                   <div>
                    <p className="font-bold text-gray-800">{order.user?.name || "Guest"}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 font-bold">
                      <Clock size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                   </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="text-brand-500" />
                  <span className="text-xs font-bold text-gray-600">{order.items.length} Items</span>
                </div>
                <p className="text-sm font-black text-gray-900">{order.totalPrice} ETB</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Delivered": "bg-green-50 text-green-500",
    "Food Processing": "bg-orange-50 text-orange-500",
    "On Delivery": "bg-blue-50 text-blue-500",
    "Cancelled": "bg-red-50 text-red-500",
    "Pending": "bg-yellow-50 text-yellow-600",
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${styles[status] || "bg-gray-50 text-gray-500"}`}>
      {status || "Processing"}
    </span>
  );
};

export default Dashboard;