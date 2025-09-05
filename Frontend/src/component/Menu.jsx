import React from 'react'


import {  menu_list } from '../assets/assets'

const Menu = ({catagory, setcatagory}) => {
    
   
  return (
    <div>
        <div className='menue sm:mx-24'>
        <h1 className='text-3xl font-medium py-3'>Explore our menu</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, soluta fugit error distinctio repellendus dicta accusamus voluptatem corrupti. Molestias soluta fugiat aut cumque quis qui quibusdam animi ratione atque reiciendis?</p>
        
        <div className='flex gap-10 py-8 overflow-auto scrollbar-hide h-64'>
                {
            
            menu_list.map((menu)=>{
                return (
                <div className='text-center' id='index' onClick={()=>{setcatagory(prev => prev==menu.menu_name ? 'All' : menu.menu_name)}} >
                <img src={menu.menu_image} alt="" className={catagory==menu.menu_name? 'border-orange-500 border-3 rounded-full' : ''}/>
                    <h1>{menu.menu_name}</h1>
                </div>)
            })
            }
        </div>
 
    </div>
    </div>
  )
}

export default Menu
