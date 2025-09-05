import React from 'react'

import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div  >
      <div className=' px-24 py-4 flex justify-between'>
        <img className ="" src={assets.logo} />
        <img className ="w-15 h-15" src={assets.profile} />
      </div>
      <hr />
    </div>
  )
}

export default Navbar
