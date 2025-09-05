import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({login, setLogin}) => {
    const [active , setactive] = useState('home')
   
  return (
    <div>
      <div className='flex  my-8 justify-around'>
         <Link to={'/'}><img src={assets.logo} alt='logo' ></img></Link>
        <ul className='hidden sm:flex gap-8 text-gray-700 font-mediumx cursor-pointer'>
           <Link to={'/'}> <li onClick={()=>{setactive('home')}} className={active == 'home' ? 'border-b-4': ''}>Home</li></Link>
            <Link to={'/menu'}><li onClick={()=>{setactive('menue')}} className={active == 'menue' ? 'border-b-4': ''} >Menu</li></Link>
            <Link to={'/mobilapp'}><li onClick={()=>{setactive('mobilapp')}} className={active == 'mobilapp' ? 'border-b-4': ''}>Mobile app</li></Link>
            <Link to={'/contactus'}><li onClick={()=>{setactive('contactus')}} className={active == 'contactus' ? 'border-b-4': ''}>Contact us</li></Link>
        </ul>

        <div className="flex gap-8">
             <img src={assets.search_icon} alt='Cart'></img>
             <div className="cart">
              <p className="dot">7</p>
              <Link to = '/cart'><img src={assets.basket_icon} alt='Cart'></img></Link>
             </div>
             
             <button onClick={() => setLogin(true)} className='border-1 rounded-3xl border-gray-400 w-30 hover:bg-gray-400 hover:text-white cursor-pointer '> Sign up</button>
        
        </div>
      </div>
    </div>
  )
}

export default Navbar
