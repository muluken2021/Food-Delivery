import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, Users, Package, RefreshCcw, DollarSign } from "lucide-react";

const Dashboard = () => {
  const summary = [
    { title: "Total Orders", value: 1245, icon: <Package className="text-brand-500" />, change: "+8%" },
    { title: "Total Revenue", value: "152,000 ETB", icon: <DollarSign className="text-brand-500" />, change: "+12%" },
    { title: "Active Users", value: 384, icon: <Users className="text-brand-500" />, change: "+5%" },
    { title: "Refund Requests", value: 12, icon: <RefreshCcw className="text-brand-500" />, change: "-2%" },
  ];

  const orderTrend = [
    { month: "Jan", orders: 120 }, { month: "Feb", orders: 200 }, { month: "Mar", orders: 250 },
    { month: "Apr", orders: 220 }, { month: "May", orders: 320 }, { month: "Jun", orders: 280 },
    { month: "Jul", orders: 350 }, { month: "Aug", orders: 420 }, { month: "Sep", orders: 390 },
    { month: "Oct", orders: 440 }, { month: "Nov", orders: 410 }, { month: "Dec", orders: 460 },
  ];

  const categoryRevenue = [
    { name: "Pizza", revenue: 48000 }, { name: "Burger", revenue: 36000 },
    { name: "Drinks", revenue: 18000 }, { name: "Pasta", revenue: 26000 },
  ];

  const deliveryStatus = [
    { name: "Completed", value: 78 }, { name: "Pending", value: 15 }, { name: "Canceled", value: 7 },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // brand-green, brand-yellow, brand-red

  const recentOrders = [
    { id: "#1001", customer: "Eleni M.", total: "380 ETB", status: "Completed", date: "Oct 24, 2025" },
    { id: "#1002", customer: "Dawit A.", total: "220 ETB", status: "Pending", date: "Oct 25, 2025" },
    { id: "#1003", customer: "Marta G.", total: "560 ETB", status: "Completed", date: "Oct 25, 2025" },
    { id: "#1004", customer: "Abel T.", total: "420 ETB", status: "Canceled", date: "Oct 26, 2025" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 bg-gray-50 text-gray-900">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <div key={index} className="shadow-md rounded-2xl p-4 flex justify-between items-center bg-white transition-transform hover:scale-105">
            <div>
              <h3 className="text-sm text-gray-500">{item.title}</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{item.value}</p>
              <span className={`text-sm font-medium ${item.change.includes("-") ? "text-brand-red" : "text-brand-green"}`}>
                {item.change}
              </span>
            </div>
            <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-4 w-full">

        {/* Orders Trend */}
        <div className="w-full h-64 md:h-72 p-4 rounded-2xl shadow-md bg-white">
          <h2 className="font-semibold text-lg mb-3 text-gray-900">Orders Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orderTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="w-full h-64 md:h-72 p-4 rounded-2xl shadow-md bg-white">
          <h2 className="font-semibold text-lg mb-3 text-gray-900">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Delivery Status */}
        <div className="w-full h-64 md:h-72 p-4 rounded-2xl shadow-md bg-white">
          <h2 className="font-semibold text-lg mb-3 text-gray-900">Delivery Status</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={deliveryStatus} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {deliveryStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="w-full p-4 rounded-2xl shadow-md bg-white overflow-x-auto">
        <h2 className="font-semibold text-lg mb-3 text-gray-900">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Completed" ? "bg-brand-green/20 text-brand-green" :
                    order.status === "Pending" ? "bg-brand-yellow/20 text-brand-yellow" :
                    "bg-brand-red/20 text-brand-red"
                  }`}>{order.status}</span>
                </td>
                <td className="p-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;