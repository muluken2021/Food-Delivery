import React from "react"; 
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Contact = () => {
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
        e.target.reset(); // Clear form
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="mx-4 sm:mx-8 lg:mx-32 my-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-500">
          Get in Touch
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
            <input type="text" placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          </div>
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          <textarea placeholder="Your Message" rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          <button type="submit" className="w-full mt-4 border-2 border-yellow-500 rounded py-2 px-4 uppercase cursor-pointer text-white bg-yellow-500 hover:bg-yellow-300 transition duration-300">
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-500">
          Contact Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-xl p-4 flex items-start gap-3 border border-gray-100">
            <MapPin className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p className="text-gray-600">Debre Berhan, Ethiopia</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 flex items-start gap-3 border border-gray-100">
            <Mail className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">support@fooddelivery.com</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 flex items-start gap-3 border border-gray-100">
            <Phone className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">+251 912 345 678</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 flex items-start gap-3 border border-gray-100">
            <Clock className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="font-semibold text-gray-800">Working Hours</p>
              <p className="text-gray-600">Mon - Sat, 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
