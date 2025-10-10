import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FoodModel from '../models/FoodModel.js';
import { authenticate } from '../middleawres/authMiddleware.js';

const router = express.Router();

// Configure multer to store uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ✅ match the static folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Add new food
router.post('/add', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    // Store relative path so frontend can use it
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const food = new FoodModel({
      name,
      description,
      category,
      price,
      image,
    });

    await food.save();

    res.json({ success: true, message: 'Food added successfully', food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all foods
router.get('/all', async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a food by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // ✅ Delete the image file from uploads
    if (food.image) {
      const imagePath = path.join(process.cwd(), food.image.replace(/^\/+/, ''));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image:', err);
        } else {
          console.log('Image deleted:', imagePath);
        }
      });
    }

    res.json({ success: true, message: 'Food and image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a food by ID
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    const food = await FoodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // ✅ If a new image is uploaded, delete the old one
    if (newImage && food.image) {
      const oldImagePath = path.join(process.cwd(), food.image.replace(/^\/+/, ''));
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Failed to delete old image:', err);
        } else {
          console.log('Old image deleted:', oldImagePath);
        }
      });
    }

    // Update fields
    food.name = name || food.name;
    food.description = description || food.description;
    food.category = category || food.category;
    food.price = price || food.price;
    if (newImage) food.image = newImage;

    await food.save();

    res.json({ success: true, message: 'Food updated successfully', food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
