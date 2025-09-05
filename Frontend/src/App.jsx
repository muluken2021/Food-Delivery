import React, { useState } from 'react'
import Home from './page/Home'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './page/Cart'
import Login from './page/Login'
import Placeorder from './page/Placeorder'

const App = () => {

  const [login,setLogin] = useState(false)

  return (
    <div>
  
        <Navbar login={login} setLogin={setLogin}/>
        {login ? <Login login={login} setLogin={setLogin}/> : ''}
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element = {<Cart />}></Route>
          <Route path='/order' element = {<Placeorder />}></Route>
        </Routes>
   
   
    </div>
  )
}

export default App
