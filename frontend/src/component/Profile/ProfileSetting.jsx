// ProfileSettingsPage.jsx
import React, { useState } from "react";

const ProfileSetting = () => {
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Add API call to update password here
    console.log("Password data:", passwordData);
  };

  return (
    <section>
      <h1 className="mb-6 md:mb-8 text-xl md:text-2xl font-bold">Setting</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <input
          type="password"
          name="current"
          value={passwordData.current}
          onChange={handleChange}
          placeholder="Current password"
          className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
        />
        <input
          type="password"
          name="new"
          value={passwordData.new}
          onChange={handleChange}
          placeholder="New password"
          className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
        />
        <input
          type="password"
          name="confirm"
          value={passwordData.confirm}
          onChange={handleChange}
          placeholder="Confirm new password"
          className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
        />
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
        <button
          onClick={handleSave}
          className="w-full md:w-auto rounded-xl bg-brand-500 px-8 py-3 font-bold text-white hover:bg-black active:scale-95"
        >
          Save Password
        </button>
      </div>
    </section>
  );
};

export default ProfileSetting;