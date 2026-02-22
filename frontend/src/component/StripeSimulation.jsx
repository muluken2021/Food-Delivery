import React, { useEffect, useState } from "react";
import { CreditCard, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";

const StripeSimulation = () => {
  const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // 1. Grab the current URL parameters
    const query = new URLSearchParams(window.location.search);

    // 2. Check if the 'status' is success
    if (query.get("status") === "success") {
      setIsSuccess(true);
      
      // 3. Optional: Clean up the URL so it looks professional again
      // This removes "?status=success" from the address bar without reloading
      const newRelativePathQuery = window.location.pathname;
      window.history.replaceState(null, "", newRelativePathQuery);
    }
  }, []);


  const handleCheckout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        items: [{ name: "Order #123", price: 20, quantity: 1 }]
      }),
    });
    
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirects to dynamic Stripe page
    }
  } catch (err) {
    console.error("Checkout failed", err);
  }
};

  // SUCCESS STATE VIEW
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border-2 border-green-100 shadow-xl text-center animate-in zoom-in duration-500">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Payment Done!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your transaction was processed successfully via Stripe Sandbox. 
          Your order is now <strong>Active</strong>.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="group flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
        >
          Return to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  // DEFAULT PAYMENT INITIATION VIEW
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
      <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <CreditCard className="text-indigo-600" size={30} />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Checkout</h2>
      <p className="text-sm text-gray-500 mb-8">
        Secure payment via Stripe. Use the testing card below.
      </p>

      <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border border-gray-200">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Test Credentials</p>
        <code className="text-sm block font-mono text-indigo-600 font-bold">4242 4242 4242 4242</code>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
          <span>EXP: 12/30</span>
          <span>CVC: 123</span>
        </div>
      </div>

      <a 
        href={STRIPE_PAYMENT_LINK}
        className="flex items-center justify-center gap-2 w-full bg-[#635BFF] text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-[0.98]"
      >
        Pay Now with Stripe <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default StripeSimulation;