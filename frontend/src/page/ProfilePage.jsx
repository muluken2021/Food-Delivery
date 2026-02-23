import React, { useState, useEffect } from "react";
import ProfileSidebar from "../component/Profile/ProfileSidebar";
import PersonalForm from "../component/Profile/PersonalForm";
import OrderManager from "./OrderManager";
import ProfileSetting from "../component/Profile/ProfileSetting";



const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [activeOrderCount, setActiveOrderCount] = useState(0);

  const url = import.meta.env.VITE_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const [profileImg, setProfileImg] = useState(
    "https://tse3.mm.bing.net/th/id/OIP.tfOvEHoC27BUODsx5P7dXwHaLH?pid=Api&P=0&h=220"
  );

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
    if (user?._id) {
      const token = localStorage.getItem("token");
      fetch(`${url}/api/order/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const active = data.orders.filter(
              (o) => o.status !== "Delivered" && o.status !== "Canceled"
            ).length;
            setActiveOrderCount(active);
          }
        })
        .catch(console.error);
    }
  }, [url, user?._id]);

  return (
    <div className="min-h-screen px-6 lg:px-24 py-20 font-sans text-gray-800">
      <div className="mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
        <ProfileSidebar
          user={formData}
          profileImg={profileImg}
          onImageChange={handleImageChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeOrderCount={activeOrderCount}
        />
        <main className="flex-1 w-full">
          {activeTab === "Personal" && <PersonalForm formData={formData} handleChange={handleChange} />}
          {activeTab === "Orders" && <OrderManager />}
          {activeTab == "Setting" && <ProfileSetting /> }
            
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;