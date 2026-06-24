import React from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useTranslation } from "../../context/LanguageContext";

// Map form field keys to translation keys
const fieldLabelKeys = {
  fullname: "profile_field_fullname",
  email:    "profile_field_email",
  phone:    "profile_field_phone",
  birthday: "profile_field_birthday",
  gender:   "profile_field_gender",
  street:   "profile_field_street",
  zip:      "profile_field_zip",
  city:     "profile_field_city",
  country:  "profile_field_country",
};

const PersonalForm = ({ formData, handleChange }) => {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className="mb-6 md:mb-8 text-xl md:text-2xl font-bold">{t('profile_personal')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {Object.entries(formData).map(([key, value]) => {
          const labelKey = fieldLabelKeys[key] || key;

          if (key === "gender") {
            return (
              <div key={key} className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400">{t(labelKey)}</label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                >
                  <option value="Male">{t('profile_gender_male')}</option>
                  <option value="Female">{t('profile_gender_female')}</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-9 text-gray-400 pointer-events-none" />
              </div>
            );
          }

          if (key === "country") {
            return (
              <div key={key} className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400">{t(labelKey)}</label>
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

          if (key === "birthday") {
            return (
              <div key={key} className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400">{t(labelKey)}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
                />
                <Calendar size={18} className="absolute right-4 top-9 text-gray-400 pointer-events-none" />
              </div>
            );
          }

          return (
            <div key={key} className="space-y-2">
              <label className="text-xs font-bold text-gray-400">{t(labelKey)}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-300"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
        <button className="w-full md:w-auto rounded-xl bg-brand-500 px-8 py-3 font-bold text-white hover:bg-black active:scale-95">
          {t('profile_save_changes')}
        </button>
      </div>
    </section>
  );
};

export default PersonalForm;
