import React, { useState } from 'react'

const Login = ({ login, setLogin }) => {

  const [signup, setSignup] = useState(true)  
  if (!login) return null

  return (
    <div className="bg-[rgba(0,0,0,0.62)] fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-5 relative">
        <button
          onClick={() => setLogin(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <form className="space-y-4">

            {signup ? <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Full Name
                </label>
                <input
                type="text"
                id="name"
                placeholder="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                required
                />
          </div> : ''}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
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
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition cursor-pointer"
          >
           {signup ?  'Sign up' : 'Login'} 
          </button>

          {signup ? <p>Aleraady have an account? <span onClick={()=> setSignup(false)} className='text-blue-400 hover:text-orange-300 cursor-pointer'>Login</span></p>
           : <p>create an account? <span onClick={()=> setSignup(true)} className='text-blue-400 hover:text-orange-300 cursor-pointer'>Sign Up</span></p>}
        </form>
      </div>
    </div>
  )
}

export default Login
