// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();
//   const url = 'http://localhost:4000';

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${url}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.admin));
//         toast.success('Login successful');
//         navigate('/admin/add');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[650px] bg-gray-50 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-yellow-500 text-center">Admin Login</h2>

//         <div>
//           <label className="block mb-1 text-gray-700 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-gray-700 font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-yellow-500 text-white w-full p-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
