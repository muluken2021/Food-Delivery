import React, { useState, useEffect } from "react";
import {
  User,
  Ticket,
  ShoppingBag,
  CreditCard,
  LogOut,
  Camera,
  Calendar,
  ChevronDown,
} from "lucide-react";
import OrderManager from "./OrderManager";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [activeOrderCount, setActiveOrderCount] = useState(0);
  const url = import.meta.env.VITE_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch count of active orders
  useEffect(() => {
    if (user?._id) {
      const token = localStorage.getItem("token");
      fetch(`${url}/api/order/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Count orders that are not Delivered or Canceled
            const active = data.orders.filter(
              (o) => o.status !== "Delivered" && o.status !== "Canceled"
            ).length;
            setActiveOrderCount(active);
          }
        })
        .catch((err) => console.error("Error fetching order count:", err));
    }
  }, [url, user?._id]);
  const [formData, setFormData] = useState({
    firstName: "Jayvion",
    lastName: "Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    birthday: "",
    gender: "Male",
    street: "",
    zip: "",
    city: "",
    country: "",
  });

  const [profileImg, setProfileImg] = useState(
    "https://tse3.mm.bing.net/th/id/OIP.tfOvEHoC27BUODsx5P7dXwHaLH?pid=Api&P=0&h=220"
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const sidebarItems = [
    { icon: <User size={18} />, label: "Personal" },
    { icon: <ShoppingBag size={18} />, label: "Orders" },
    { icon: <CreditCard size={18} />, label: "Payment" },
  ];

  return (
    <div className="min-h-screen px-6 lg:px-24 py-20 font-sans text-gray-800">
      <div className="mx-auto flex  flex-col md:flex-row gap-6 md:gap-10">

        {/* ---------- SIDEBAR ---------- */}
        <aside className="w-full md:w-72 flex-shrink-0 rounded-3xl bg-gray-50 p-4 md:p-6 shadow-sm">

          {/* Profile */}
          <div className="flex flex-col items-center border-b border-gray-300 pb-6 md:pb-8 text-center">
            <div className="relative mb-3 md:mb-4">
              <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Upload */}
              <label className="absolute bottom-0 right-0 flex h-7 md:h-8 items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold shadow-md hover:bg-gray-50 cursor-pointer">
                <Camera size={12} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <h2 className="text-lg md:text-xl font-bold">
              {formData.firstName}
            </h2>
            <p className="text-xs text-gray-400 break-all">
              {formData.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-6 md:mt-8 flex md:block gap-2 overflow-x-auto md:space-y-2">

            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-3 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === item.label
                    ? "bg-white text-brand-500 shadow-sm"
                    : "text-gray-500 hover:bg-white/50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>

                {/* Blinking Badge for Orders */}
                {item.label === "Orders" && activeOrderCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full animate-blink font-bold shadow-sm">
                    {activeOrderCount}
                  </span>
                )}
              </button>
            ))}

            {/* Logout */}
            <div className="md:pt-10">
              <button className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors whitespace-nowrap">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-1 w-full">

          {activeTab === "Personal" && (
            <section>
              <h1 className="mb-6 md:mb-8 text-xl md:text-2xl font-bold">
                Personal
              </h1>

              {/* Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Birthday */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Birthday
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                    />
                    <Calendar
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Street */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Zip */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Zip/code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                    >
                      <option></option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="mt-10 md:mt-12 border-t border-gray-300 pt-6 md:pt-8">
                <h3 className="text-lg md:text-xl font-bold mb-4">
                  Change Password
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-10 flex justify-center md:justify-end">
                <button className="w-full md:w-auto rounded-xl bg-brand-500 px-8 py-3 font-bold text-white hover:bg-black active:scale-95">
                  Save changes
                </button>
              </div>
            </section>
          )}


          {activeTab === "Orders" && (
            <section>
              <OrderManager />

            </section>
          )}
          {/* Other Tabs */}
          {activeTab !== "Personal" || "Orders" && (
            <section>
              <h1 className="text-xl md:text-2xl font-bold">{activeTab}</h1>
              <p className="mt-4 text-gray-600">
                Content for {activeTab} will appear here.
              </p>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
