import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';


const Placeorder = () => {
     const {TotalCartPrice} = useContext(StoreContext)
  const DeliveryFee = 2;

  return (
    <div className='mx-32 grid grid-cols-2 my-24'>

        <div className='w-150'>
            <h1 className="text-3xl font-bold py-4">Delivery Information</h1>
            <form>
                <div className='grid grid-cols-2 gap-4 py-2'>
                    <div>
                        
                        <input
                        type="fname"
                        id="fname"
                        placeholder="First Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                    <div>
                        
                        <input
                        type="lname"
                        id="lname"
                        placeholder="Last Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                </div>

                <div className='py-2'>   
                    <input
                    type="Email"
                    id="Email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                    required
                    />
                </div>

                 <div className='py-2'>   
                    <input
                    type="Streat"
                    id="Streat"
                    placeholder="Streat"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                    required
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        
                        <input
                        type="city"
                        id="city"
                        placeholder="City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                    <div>
                        
                        <input
                        type="State"
                        id="State"
                        placeholder="State"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 py-3'>
                    <div>
                        
                        <input
                        type="zp-code"
                        id="zp-code"
                        placeholder="zp-code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                    <div>
                        
                        <input
                        type="country"
                        id="country"
                        placeholder="country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                        required
                        />
                    </div>
                </div>

                <div>
                        
                    <input
                    type="phone"
                    id="phone"
                    placeholder="phone  "
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                    required
                    />
                </div>
                
            </form>
        </div>


      <div className=' w-100'>
        <h1 className="text-2xl font-bold py-4">Cart Totals</h1>
        <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${TotalCartPrice()}</p>   
        </div>
        <hr className='text-gray-400 my-2'/>
         <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>
              ${
                TotalCartPrice() > 0 ? DeliveryFee : '0'
              }  
            </p>   
        </div>
        <hr className='text-gray-400 my-2'/>
         <div className="flex justify-between">
            <p className='font-medium'>Total</p>
            <p>${TotalCartPrice() > 0 ? TotalCartPrice() + DeliveryFee : '0' }</p>   
        </div>
         <hr className='text-gray-400 my-2'/>

          <Link to='/payment'><button className='my-10 border-2 border-orange-500 rounded my-3 py-2 px-4 uppercase cursor-pointer text-white bg-orange-600 hover:bg-orange-500 '>Proceed To Payment</button></Link> 
     
         </div>
     
    </div>
  )
}

export default Placeorder
