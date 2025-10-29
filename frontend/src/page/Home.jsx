import React, { useState } from 'react'
import Header from '../component/Header'
import Menu from '../component/Menu'
import Fooditems from '../component/Fooditems'
import HowItWorks from '../component/HowItWorks'
import FoodSearch from '../component/FoodSearch'
import PopularDishes from '../component/PopularDishes'
import ExploreMenu from '../component/ExploreMenu'
import Testimonials from '../component/Testimonials'
import MeetOurChefs from '../component/MeetOurChefs'
import About from '../component/About'

const Home = ({ setLogin }) => {
 

  return (
    <div className='container'>
      <Header setLogin={setLogin} /> {/* You can still pass scrollToMenu here if you want a button inside header */}
      <PopularDishes />
       <ExploreMenu />
      {/* Attach the menuRef here */}
      
     
      <MeetOurChefs />
      
      <HowItWorks />
      <Testimonials />
    </div>
  )
}

export default Home
