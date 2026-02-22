import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Optional: for a cleaner close icon

const Login = ({ login, setLogin }) => {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!login) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = import.meta.env.VITE_APP_API_URL;
      const endpoint = signup ? "/api/user/register" : "/api/user/login";
      const res = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLogin(false);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
      {/* Main Container: Split Screen */}
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl min-h-[550px] bg-white rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setLogin(false)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-gray-400 hover:text-gray-900 md:hover:bg-gray-100 transition-all"
        >
          <X size={24} />
        </button>

        {/* Left Section: Visual/Welcome */}
        <div className="relative hidden md:flex flex-1 items-center justify-center p-12 overflow-hidden">
          {/* Background Image/Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 to-black/80" />
          
          {/* Welcome Text */}
          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">Welcome</h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs mx-auto">
              Join our community to explore fresh flavors and exclusive recipes tailored just for you.
            </p>
            <button className="text-brand-300 text-xs font-semibold hover:underline">
              Learn more
            </button>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {signup ? "Register" : "Login"}
              </h2>
              <p className="text-gray-500 text-sm">
                {signup ? "Create your account. It's free and only takes a minute." : "Welcome back! Please enter your details."}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {signup && (
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100 animate-shake">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center disabled:opacity-70 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : signup ? "Register Now" : "Sign In"}
                </button>
              </div>

              <p className="text-sm text-center text-gray-500 pt-2">
                {signup ? "Already have an account? " : "New to our platform? "}
                <button
                  type="button"
                  onClick={() => setSignup(!signup)}
                  className="text-brand-600 font-bold hover:text-brand-800 underline-offset-4 hover:underline transition-all"
                >
                  {signup ? "Login here" : "Create account"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;