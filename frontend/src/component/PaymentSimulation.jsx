import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2, CreditCard, ShieldCheck } from "lucide-react";

const PaymentSimulation = ({ amount = "150.00", onComplete }) => {
  const [status, setStatus] = useState("idle"); // idle, processing, success, fail

  const startPayment = () => {
    setStatus("processing");
    
    // Simulate network delay of 2.5 seconds
    setTimeout(() => {
      // 80% chance of success for the simulation
      const isSuccessful = Math.random() > 0.2;
      setStatus(isSuccessful ? "success" : "fail");
    }, 2500);
  };

  const reset = () => setStatus("idle");

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
      {status === "idle" && (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="text-brand-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Confirm Payment</h2>
          <p className="text-gray-500 mb-8">You are about to pay <span className="text-gray-900 font-bold">${amount}</span></p>
          
          <button 
            onClick={startPayment}
            className="w-full bg-brand-500 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95"
          >
            Pay Now
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
            <ShieldCheck size={14} /> Secured Simulation
          </div>
        </div>
      )}

      {status === "processing" && (
        <div className="py-10 animate-in fade-in duration-300">
          <Loader2 className="mx-auto text-brand-500 animate-spin mb-6" size={48} />
          <h2 className="text-xl font-bold mb-2">Processing Transaction</h2>
          <p className="text-gray-500">Please do not refresh the page...</p>
        </div>
      )}

      {status === "success" && (
        <div className="animate-in zoom-in duration-500">
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Your order has been placed and is being prepared.</p>
          
          <button 
            onClick={() => onComplete?.('success')}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all"
          >
            View My Orders
          </button>
        </div>
      )}

      {status === "fail" && (
        <div className="animate-in shake-in duration-500">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="text-red-500" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-500 mb-8">Something went wrong with your card provider. Please try again.</p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={startPayment}
              className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-all"
            >
              Try Again
            </button>
            <button 
              onClick={reset}
              className="text-gray-400 font-semibold text-sm hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSimulation;