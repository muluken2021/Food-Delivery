// PersonalForm.jsx
import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

const PersonalForm = ({ formData, handleChange }) => {
  return (
    <section>
      <h1 className="mb-6 md:mb-8 text-xl md:text-2xl font-bold">Personal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {Object.entries(formData).map(([key, value]) => {
          if (key === "gender" || key === "country") {
            return (
              <div key={key} className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400">{key}</label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                >
                  {key === "gender"
                    ? ["Male", "Female"].map((opt) => <option key={opt}>{opt}</option>)
                    : <option></option>}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            );
          } else if (key === "birthday") {
            return (
              <div key={key} className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                />
                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            );
          } else {
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-bold text-gray-400">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                />
              </div>
            );
          }
        })}
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
        <button className="w-full md:w-auto rounded-xl bg-brand-500 px-8 py-3 font-bold text-white hover:bg-black active:scale-95">
          Save changes
        </button>
      </div>
    </section>
  );
};

export default PersonalForm;