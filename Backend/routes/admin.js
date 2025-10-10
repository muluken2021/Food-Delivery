import express from 'express';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/AdminModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Register Admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin with role
    const admin = new AdminModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin', // explicitly set role
    });

    await admin.save();

    res.json({
      success: true,
      message: 'Admin registered successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role // include role in response
      }
    });
  } catch (err) {
    console.error('Register admin error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const adminUser = await AdminModel.findOne({ email: email.toLowerCase() });
    if (!adminUser) return res.status(401).json({ success: false, message: 'Admin not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // Create JWT with role
    const token = jwt.sign(
      { id: adminUser._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      admin: { name: adminUser.name, email: adminUser.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
