import React, { useState } from 'react'
import Header from '../component/Header'
import Menu from '../component/Menu'
import Fooditems from '../component/Fooditems'
import HowItWorks from '../component/HowItWorks'
import FoodSearch from '../component/FoodSearch'

const Home = ({ menuRef, scrollToMenu }) => {
  const [category, setcatagory] = useState('All')
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className='container'>
      <Header scrollToMenu={scrollToMenu}/> {/* You can still pass scrollToMenu here if you want a button inside header */}
      
      {/* Attach the menuRef here */}
      <div ref={menuRef}>
        <Menu category={category} setcatagory={setcatagory} />
      </div>

      <FoodSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Fooditems category={category} searchQuery={searchQuery} />
      <HowItWorks />
    </div>
  )
}

export default Home
