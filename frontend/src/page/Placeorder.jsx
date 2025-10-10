import React, { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { TotalCartPrice, cartItems, clearCart } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const DeliveryFee = 2;
  const url = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const formRef = useRef(null); // add form ref

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
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
    // check browser form validity
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // triggers browser required messages
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

    if (loading) return;
    setLoading(true);

    const order = {
      user: user._id,
      items: Object.keys(cartItems).map(id => ({
        food: id,
        quantity: cartItems[id]
      })),
      totalPrice: TotalCartPrice() + DeliveryFee,
      deliveryInfo: formData,
      status: 'Paid'
    };

    try {
      const response = await fetch(`${url}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order added successfully!');
        clearCart();
        navigate('/orderpage');
      } else {
        toast.error('Failed to add order.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-4 sm:mx-8 lg:mx-32 my-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <div className='w-full'>
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-400">Delivery Information</h1>
        <form ref={formRef} className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          </div>

          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
          </div>

          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200" required />
        </form>
      </div>

      <div className='w-full'>
        <h1 className="text-2xl sm:text-3xl font-bold py-4 text-yellow-400">Cart Totals</h1>
        <div className="flex justify-between py-1"><p>Subtotal</p><p>${TotalCartPrice()}</p></div>
        <hr className='text-gray-400 my-2'/>
        <div className="flex justify-between py-1"><p>Delivery Fee</p><p>${TotalCartPrice() > 0 ? DeliveryFee : '0'}</p></div>
        <hr className='text-gray-400 my-2'/>
        <div className="flex justify-between py-1"><p className='font-medium'>Total</p><p>${TotalCartPrice() > 0 ? TotalCartPrice() + DeliveryFee : '0'}</p></div>
        <hr className='text-gray-400 my-2'/>

        <button
          onClick={handleProceed}
          disabled={loading}
          className='w-full mt-6 border-2 border-yellow-400 rounded py-2 px-4 uppercase cursor-pointer text-white bg-yellow-400 hover:bg-yellow-300 transition duration-300'
        >
          {loading ? 'Processing...' : 'Proceed To Payment'}
        </button>
      </div>
    </div>
  );
};

export default Placeorder;
