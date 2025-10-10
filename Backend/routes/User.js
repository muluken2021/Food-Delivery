import express from "express";
import User from "../models/User.js"; // ✅ consistent naming
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticate, authorizeAdmin } from "../middleawres/authMiddleware.js"; // ✅ fix folder name
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: { _id: user._id, name, email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// GET /api/user
router.get("/", authenticate, async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find().select("-password"); // ✅ consistent
    } else {
      users = await User.find({ _id: req.user._id }).select("-password");
    }
    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/user/:id (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    // Find user first
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    // 🚫 Prevent deleting admin users
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admins cannot be deleted",
      });
    }

    await user.deleteOne();
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
