import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import Order from './pages/Order'
import List from './pages/List'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex '>
       
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add />}/>
          <Route path='/order' element={<Order />}/>
          <Route path='/list' element={<List />}/>
        </Routes>
        
        
      </div>
      
    </div>
  )
}

export default App
