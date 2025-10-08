// OrderSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold text-teal-600 mb-4">Payment Successful!</h1>
    <p>Your order has been placed successfully.</p>
    <Link to="/" className="mt-6 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-500">Back to Home</Link>
  </div>
);

export default OrderSuccess;
