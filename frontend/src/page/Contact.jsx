import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all duration-200 bg-white text-gray-800 placeholder:text-gray-400";

  const infoItems = [
    { icon: MapPin, title: "Visit Us", text: "Debre Berhan, Ethiopia" },
    { icon: Mail, title: "Email Us", text: "support@fooddelivery.com" },
    { icon: Phone, title: "Call Us", text: "+251 912 345 678" },
    { icon: Clock, title: "Hours", text: "Mon - Sat, 9AM - 8PM" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 font-sans text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Contact Form */}
        <div className="space-y-8">
          <div>
           <h1 className="text-3xl md:text-5xl font-black/30 text-slate-900 tracking-tight mb-5">
            Get In <span className="text-brand-500">Touch</span>
          </h1>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" type="text" placeholder="First Name" className={inputClass} required />
              <input name="lastName" type="text" placeholder="Last Name" className={inputClass} required />
            </div>
            <input name="email" type="email" placeholder="Email Address" className={inputClass} required />
            <textarea name="message" placeholder="How can we help?" rows="5" className={inputClass} required />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center justify-center gap-2 w-full sm:w-max px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right: Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pt-4">
          {infoItems.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="bottom-right" hideProgressBar />
    </div>
  );
};

export default Contact;