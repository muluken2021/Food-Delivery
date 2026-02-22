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
import Features from '../component/Features'
import StripeSimulation from '../component/StripeSimulation'


const Home = () => {
 

  return (
    <div >
      <Header/> {/* You can still pass scrollToMenu here if you want a button inside header */}
        <HowItWorks />
         <PopularDishes />
       <ExploreMenu />
      {/* Attach the menuRef here */}
      <Features />
     
      {/* <MeetOurChefs /> */}
      
      <StripeSimulation />
      <Testimonials />
    </div>
  )
}

export default Home
