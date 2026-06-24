import React, { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const Checkout = () => {
  const { TotalCartPrice, cartItems, foodList, clearCart } = useContext(StoreContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const DeliveryFee = 2;
  const url = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zip: '', country: '', phone: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData(prev => ({ ...prev, email: storedUser.email }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = async () => {
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    if (!user) {
      toast.error('Please login to place an order.');
      return;
    }
    if (TotalCartPrice() === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setLoading(true);

    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      userId: user._id,
      items: orderItems,
      amount: TotalCartPrice() + DeliveryFee,
      address: formData,
    };

    try {
      const response = await fetch(`${url}/api/payment/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error('Error creating payment session');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <div className="mx-6 md:mx-24 my-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* --- FORM SECTION --- */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-gray-700">{t('checkout_delivery_info')}</h1>
        <form ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t('checkout_first_name')} className={inputClass} required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t('checkout_last_name')} className={inputClass} required />
          </div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('checkout_email')} className={inputClass} required />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder={t('checkout_street')} className={inputClass} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder={t('checkout_city')} className={inputClass} required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder={t('checkout_state')} className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder={t('checkout_zip')} className={inputClass} required />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder={t('checkout_country')} className={inputClass} required />
          </div>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('checkout_phone')} className={inputClass} required />
        </form>
      </div>

      {/* --- TOTALS SECTION --- */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-gray-700">{t('checkout_cart_totals')}</h1>
        <div className="flex justify-between py-1"><p>{t('checkout_subtotal')}</p><p>${TotalCartPrice()}</p></div>
        <hr className="text-gray-400 my-2" />
        <div className="flex justify-between py-1"><p>{t('checkout_delivery_fee')}</p><p>${TotalCartPrice() > 0 ? DeliveryFee : '0'}</p></div>
        <hr className="text-gray-400 my-2" />
        <div className="flex justify-between py-1 font-bold text-lg">
          <p>{t('checkout_total')}</p>
          <p>${TotalCartPrice() > 0 ? TotalCartPrice() + DeliveryFee : '0'}</p>
        </div>

        <button
          onClick={handleProceed}
          disabled={loading}
          className="w-full mt-6 bg-brand-400 text-white font-bold py-3 rounded-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? t('checkout_connecting') : t('checkout_proceed_payment')}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
          <span className="w-8 h-[1px] bg-gray-200"></span>
          {t('checkout_secured')}
          <span className="w-8 h-[1px] bg-gray-200"></span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
