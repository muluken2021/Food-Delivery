import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

const Add = () => { 
    const [image, setimage] = useState(false)
    const [data, setData] = useState({
        name : '',
        description : '',
        catagory : 'salad',
        price : ''
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value

        setData(data=>({...data , [name]: value}))
    }

   const onsubmithandler = async(event) => {
       event.preventDefault();
       const url = 'http://localhost:4000';
       const formData = new FormData();
       formData.append('name', data.name)
       formData.append('description', data.description)
       formData.append('catagory', data.catagory)
       formData.append('price', data.price)
       formData.append('image', image)

       const respose = await axios.post(`${url}/api/food/add`, formData)
       
       if(Response.data.success) {

         setData({
            name : '',
            description : '',
            catagory : 'salad',
            price : ''
         })
         setimage(false)
         toast.success(respose.data.message)
       }
       else{
        toast.error(respose.data.message)
       }
    

   }

  return (
    <div>
      <form className="p-8" onSubmit={onsubmithandler}>
        <div>
            <h4 className='py-4'>Upload Image</h4>
           <label htmlFor='image'> <img  src={image?URL.createObjectURL(image):assets.upload} className="cursor-pointer w-30 h-20" /></label>
           <input onChange={(e)=>{setimage(e.target.files[0])}} id='image' type='file' hidden required></input>
        </div>

        <div>
            <h4 className='py-2'>Product Name</h4>
            <input onChange={onChangeHandler} value={data.name} className='border-1 p-2 w-100' type='text' name= "name" placeholder='Product name'/>
        </div>
        
        <div>
            <h4 className='py-2'>Prooduct Description</h4>
            <textarea onChange={onChangeHandler} name='description' value={data.description} className='border-1 p-2 w-100 h-20'></textarea>
        </div>
        
        <div className='flex gap-10'>
           <div>
                <h4 className='py-2'>Prooduct Catagory</h4>
                <select onChange={onChangeHandler} value={data.catagory} className='border-1 p-2 w-50' name="catagory" id="">
                    <option value="salad">salad</option>
                    <option value="salad">salad</option>
                    <option value="salad">salad</option>
                    <option value="salad">salad</option>
                </select>
            </div> 
           <div>
            <h4 className='py-2'>Prooduct Price</h4>
            <input onChange={onChangeHandler} value={data.price} type="Number" className='border-1 p-2 w-40' name="price" id="" placeholder='$20' />
           </div>
            
        </div>
        

        <button type='submit'  className='text-white border-1 bg-orange-400 my-8 w-60 p-2  hover:bg-orange-500'>Add</button>
          
      </form>
    </div>
  )
}

export default Add
