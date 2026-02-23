import React, { useState } from 'react'
import Header from '../component/Header'
import HowItWorks from '../component/HowItWorks'
import PopularDishes from '../component/PopularDishes'
import ExploreMenu from '../component/ExploreMenu'
import Testimonials from '../component/Testimonials'
import Features from '../component/Features'

const Home = () => {
 

  return (
    <div >
         <Header/> {/* You can still pass scrollToMenu here if you want a button inside header */}
         <HowItWorks />
         <PopularDishes />
         <ExploreMenu />
      
         <Features />
         <Testimonials />
    </div>
  )
}

export default Home
