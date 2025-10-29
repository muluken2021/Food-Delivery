import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ login, setLogin }) => {

  const [signup, setSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  

  if (!login) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = import.meta.env.VITE_APP_API_URL;
      const endpoint = signup ? '/api/user/register' : '/api/user/login';
      const response = await fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setLogin(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/");
        } else {
          navigate("/"); // normal user
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-[rgba(0,0,0,0.62)] fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-5 relative">
        <button
          onClick={() => setLogin(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center text-yellow-500">
          {signup ? 'Sign Up' : 'Login'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {signup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
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
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
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
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
          >
            {signup ? 'Sign Up' : 'Login'}
          </button>

          {signup ? (
            <p className="text-sm text-center">
              Already have an account?{' '}
              <span
                onClick={() => setSignup(false)}
                className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-center">
              Create an account?{' '}
              <span
                onClick={() => setSignup(true)}
                className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
