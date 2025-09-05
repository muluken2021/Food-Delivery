import FoodModel from "../models/Foodmodel.js";
import fs from 'fs';

// add food 

const addfood = async(req,res) => {
  const image_filename = `${req.file.filename}`

  const food = new FoodModel({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,
    catagory : req.body.catagory,
    image : image_filename

  }) 
  try {
    await food.save();
    res.json({success: true, message: 'food added sucessfully!'})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: 'failed to add!'})
    
  }
}

// list all food

const listFood = async(req,res) => {
    const foods = await FoodModel.find({})
    try {
        res.json({success: true , data: foods })
    } catch (error) {
        
    }
}

// delete food 
// sample id : 688f51adc30ce1dced6f2552
const deleteFood = async(req, res) => {
    try {
        const food = await FoodModel.findById(req.body.id)
        fs.unlink(`uploades/${food.image}`, ()=>{})

        await FoodModel.findOneAndDelete(req.body.id)
        res.json({sucess: true , message: 'food deleted sucessfully!'})
    } catch (error) {
        console.log(error)
        res.json({sucess: false , message: 'failed to delete food !'})
    }
}

export {addfood, listFood , deleteFood}