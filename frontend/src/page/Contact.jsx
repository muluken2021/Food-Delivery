import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "../context/LanguageContext";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const url = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${url}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message || "Message sent successfully!");
        e.target.reset();
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4B7318] focus:ring-1 focus:ring-[#4B7318] outline-none transition-all duration-200 bg-[#F4F4F4] text-black placeholder:text-gray-400 text-sm";

  const infoItems = [
    { icon: MapPin, titleKey: "contact_visit", text: "Debre Berhan, Ethiopia" },
    { icon: Mail, titleKey: "contact_email_us", text: "support@yegnabyte.com" },
    { icon: Phone, titleKey: "contact_call", text: "+251 912 345 678" },
    { icon: Clock, titleKey: "contact_hours", text: "Mon - Sat, 9AM - 8PM" },
  ];

  return (
    <div className="w-full bg-white select-none py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-[#4B7318]"></span>
                <span className="text-[#4B7318] font-bold tracking-widest uppercase text-xs">
                  {t("contact_label") || "Get In Touch"}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-3">
                {t("contact_heading") || "Have Questions?"}{" "}
                <span className="text-[#4B7318]">
                  {t("contact_heading_highlight") || "Contact Us"}
                </span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {t("contact_desc") || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder={t("contact_first_name") || "First Name"}
                  className={inputClass}
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder={t("contact_last_name") || "Last Name"}
                  className={inputClass}
                  required
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder={t("contact_email") || "Email Address"}
                className={inputClass}
                required
              />
              <textarea
                name="message"
                placeholder={t("contact_message") || "Your Message..."}
                rows="5"
                className={inputClass}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#4B7318] hover:bg-[#3d5e13] text-white font-bold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-70 active:scale-95 shadow-md"
              >
                {isSubmitting
                  ? t("contact_sending") || "Sending..."
                  : t("contact_send") || "Send Message"}
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Column: Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pt-8">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#EAEAEA] border border-gray-200/60 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#4B7318] mb-4 shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-black text-base">
                    {t(item.titleKey) || item.titleKey}
                  </h3>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar theme="dark" />
    </div>
  );
};

export default Contact;