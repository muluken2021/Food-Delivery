import React, { useState, useEffect } from "react";
import ProfileSidebar from "../component/Profile/ProfileSidebar";
import PersonalForm from "../component/Profile/PersonalForm";
import OrderManager from "./OrderManager";
import ProfileSetting from "../component/Profile/ProfileSetting";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [activeOrderCount, setActiveOrderCount] = useState(0);

  const url = import.meta.env.VITE_APP_API_URL;

  // Load user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  

  const [profileImg, setProfileImg] = useState(
    storedUser.photo );

  const [formData, setFormData] = useState({
    fullname: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    birthday: storedUser.birthday || "",
    gender: storedUser.gender || "Male",
    street: storedUser.street || "",
    zip: storedUser.zip || "",
    city: storedUser.city || "",
    country: storedUser.country || "",
  });

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

  // Fetch active orders
useEffect(() => {
  if (storedUser?._id) {
    const token = localStorage.getItem("token");
    fetch(`${url}/api/order/user/${storedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.orders)) {
          const active = data.orders.filter(
            (o) => o.status !== "Delivered" && o.status !== "Canceled"
          ).length;
          setActiveOrderCount(active);
        } else {
          setActiveOrderCount(0); // no orders
        }
      })
      .catch((err) => {
        console.error(err);
        setActiveOrderCount(0); // fail safe
      });
  }
}, [url, storedUser?._id]);

  return (
    <div className="min-h-screen px-6 lg:px-24 py-20 font-sans text-gray-800">
      <div className="mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
        <ProfileSidebar
          user={formData} // pass dynamic user info
          profileImg={profileImg}
          onImageChange={handleImageChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeOrderCount={activeOrderCount}
        />
        <main className="flex-1 w-full">
          {activeTab === "Personal" && (
            <PersonalForm formData={formData} handleChange={handleChange} />
          )}
          {activeTab === "Orders" && <OrderManager />}
          {activeTab === "Setting" && <ProfileSetting />}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;