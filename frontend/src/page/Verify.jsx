import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  
  // Use the context URL, but fallback to 4000 if it's undefined
  const { url, clearCart } = useContext(StoreContext); 
  const backendUrl = url || "http://localhost:4000"; 
  
  const navigate = useNavigate();
  const hasCalled = useRef(false);

  const verifyPayment = async () => {
    // Prevent double calling in React Strict Mode
    if (hasCalled.current) return;
    hasCalled.current = true;

    try {
      console.log("Attempting to verify with backend at:", `${backendUrl}/api/payment/verify`);
      
      const response = await fetch(`${backendUrl}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success, orderId })
      });

      const data = await response.json();
      console.log("Backend response received:", data);

      if (data.success) {
        clearCart(); 
        console.log("Cart cleared, navigating to profile...");
        navigate("/profile"); 
      } else {
        console.error("Verification failed in backend");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Critical Fetch Error:", error);
      // If backend is down, go home after 3 seconds so user isn't stuck
      setTimeout(() => navigate("/"), 3000);
    }
  };

  useEffect(() => {
    // Only run if we have an orderId to check
    if (orderId) {
        verifyPayment();
    } else {
        console.warn("No orderId found in URL");
        navigate("/");
    }
  }, [orderId]); 

  return (
    <div className='min-h-[60vh] flex flex-col justify-center items-center'>
      <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
      <p className='mt-4 text-gray-600 font-medium'>Finalizing your order...</p>
      <p className='text-xs text-gray-400'>Processing payment confirmation</p>
    </div>
  );
};

export default Verify;