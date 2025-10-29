import React, { useContext } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const url = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      message: e.target[3].value,
    };

    try {
      const res = await fetch(`${url}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        e.target.reset();
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e58d00] transition-colors duration-300 ${
    theme === "dark"
      ? "bg-[#1a1a1a] border-gray-700 text-white placeholder-gray-400"
      : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
  }`;

  const cardClass = `bg-${
    theme === "dark" ? "#1a1a1a" : "white"
  } shadow-lg rounded-xl p-5 flex items-start gap-4 border ${
    theme === "dark" ? "border-gray-700" : "border-gray-200"
  } transition-transform duration-300 hover:scale-105`;

  return (
    <div
      className={`mx-4 sm:mx-8 lg:mx-32 my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Contact Form */}
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-bold py-4 text-[#e58d00]">
          Get in Touch
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className={inputClass} required />
            <input type="text" placeholder="Last Name" className={inputClass} required />
          </div>
          <input type="email" placeholder="Email" className={inputClass} required />
          <textarea placeholder="Your Message" rows="5" className={inputClass} required />
          <button
            type="submit"
            className="w-full mt-4 border-2 border-orange-500 rounded-lg py-3 px-4 uppercase font-semibold cursor-pointer bg-[#e58d00] hover:bg-yellow-500 text-white transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-bold py-4 text-[#e58d00]">
          Contact Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: MapPin, title: "Address", text: "Debre Berhan, Ethiopia" },
            { icon: Mail, title: "Email", text: "support@fooddelivery.com" },
            { icon: Phone, title: "Phone", text: "+251 912 345 678" },
            { icon: Clock, title: "Working Hours", text: "Mon - Sat, 9:00 AM - 8:00 PM" },
          ].map((item, i) => (
            <div key={i} className={cardClass}>
              <item.icon className="text-[#e58d00] w-6 h-6 mt-1" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-400">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
