import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Login = ({ login, setLogin }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [signup, setSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (!login) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

const [loading, setLoading] = useState(false); // new state

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // start loading
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
    setLoading(false); // stop loading
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.6)]">
      <div className={`relative p-6 rounded-xl shadow-md w-full max-w-sm space-y-5 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        {/* Close Icon */}
        <button
          onClick={() => setLogin(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center text-yellow-500">{signup ? "Sign Up" : "Login"}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {signup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition flex justify-center items-center"
            disabled={loading} // disable button while loading
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : signup ? "Sign Up" : "Login"}
          </button>

          <p className="text-sm text-center">
            {signup ? "Already have an account? " : "Create an account? "}
            <span
              onClick={() => setSignup(!signup)}
              className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
            >
              {signup ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
