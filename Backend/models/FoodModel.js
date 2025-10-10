import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    default: 'salad',
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // store image filename or URL
  },
}, { timestamps: true });

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;
