import React, { useState } from 'react'

import Header from '../component/Header'
import Menu from '../component/Menu'
import Fooditems from '../component/Fooditems'


const Home = () => {
     const [catagory,setcatagory] = useState('All')
     
  

  return (
    <div className='container'>
        <Header />
        <Menu catagory={catagory} setcatagory={setcatagory}/>
        <Fooditems catagory={catagory}/>
    </div>
  )
}

export default Home
