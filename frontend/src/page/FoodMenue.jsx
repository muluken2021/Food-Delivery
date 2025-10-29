




import React, { useContext, useState } from 'react'
import FoodSearch from '../component/FoodSearch'
import Fooditems from '../component/Fooditems'
import Menu from '../component/Menu'
import { ThemeContext } from "../context/ThemeContext";


const FoodMenue = () => {
const [category, setcatagory] = useState('all')
const [searchQuery, setSearchQuery] = useState("")
const { theme } = useContext(ThemeContext);
return (
  <div>
    
    <Menu searchQuery={searchQuery} setSearchQuery={setSearchQuery} category={category} setcatagory={setcatagory} />
    
    <Fooditems category={category} searchQuery={searchQuery} />
  </div>
)
}

export default FoodMenue;  
