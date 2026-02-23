// Sidebar.jsx
import React from "react";
import { Camera, LogOut, User, ShoppingBag , Settings } from "lucide-react";

// Map string names to actual icons
const icons = {
  User: User,
  Orders: ShoppingBag,
  setting: Settings,
};

const ProfileSidebar = ({
  user,
  profileImg,
  onImageChange,
  activeTab,
  setActiveTab,
  activeOrderCount,
}) => {
  const sidebarItems = [
    { icon: "User", label: "Personal" },
    { icon: "Orders", label: "Orders" },
    { icon: "setting", label: "Setting" },
  ];

  return (
    <aside className="w-full md:w-72 flex-shrink-0 rounded-3xl bg-gray-50 p-4 md:p-6 shadow-sm">
      {/* Profile */}
      
      <div className="flex flex-col items-center border-b border-gray-300 pb-6 md:pb-8 text-center">
        <div className="relative mb-3 md:mb-4">
          <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-white shadow-sm">
            <img src={profileImg} alt="Profile" className="h-full w-full object-cover" />
          </div>

          {/* Upload */}
          <label className="absolute bottom-0 right-0 flex h-7 md:h-8 items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold shadow-md hover:bg-gray-50 cursor-pointer">
            <Camera size={12} />
            <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
          </label>
        </div>

        <h2 className="text-lg md:text-xl font-bold">{user.firstName}</h2>
        <p className="text-xs text-gray-400 break-all">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 md:mt-8 flex md:block gap-2 overflow-x-auto md:space-y-2">
        {sidebarItems.map((item) => {
          const IconComponent = icons[item.icon]; // get the actual icon
          return (
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
                {IconComponent && <IconComponent size={18} />}
                {item.label}
              </div>

              {item.label === "Orders" && activeOrderCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full animate-blink font-bold shadow-sm">
                  {activeOrderCount}
                </span>
              )}
            </button>
          );
        })}

        {/* Logout */}
        <div className="md:pt-10">
          <button className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors whitespace-nowrap">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;