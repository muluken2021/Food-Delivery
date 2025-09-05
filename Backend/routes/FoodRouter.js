import express from 'express';
import { addfood, deleteFood, listFood } from '../controllers/FoodController.js';
import multer from 'multer';

// food storage logic 
const storage = multer.diskStorage({
  destination: 'uploades',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

const foodrouter = express.Router();

foodrouter.post('/add', upload.single('image'), addfood);
foodrouter.get('/list-foods' , listFood);
foodrouter.post(`/delete` , deleteFood)

export default foodrouter;
