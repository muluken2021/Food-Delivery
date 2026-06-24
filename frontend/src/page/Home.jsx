import React, { useState } from 'react'
import Header from '../component/Header'
import HowItWorks from '../component/HowItWorks'
import PopularDishes from '../component/PopularDishes'
import ExploreMenu from '../component/ExploreMenu'
import Testimonials from '../component/Testimonials'
import Features from '../component/Features'
import FeaturedCategories from '../component/FeaturedCategories'
import PromotionalBanners from '../component/PromotionalBanners'
import FootorBanner from '../component/FootorBanner'

const Home = () => {
 

  return (
    <div >
         <Header/> {/* You can still pass scrollToMenu here if you want a button inside header */}
         {/* <HowItWorks /> */}
         <FeaturedCategories />
         <PopularDishes />
         <PromotionalBanners />
         <ExploreMenu />
      
         {/* <Features /> */}
         <Testimonials />
         <FootorBanner />
    </div>
  )
}

export default Home
