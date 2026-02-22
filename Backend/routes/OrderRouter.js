import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    // 1. Query by 'user' (matching your schema)
    // 2. Only show orders where payment is true (optional but recommended)
    // 3. Populate 'food' inside the items array
    const orders = await Order.find({ 
        user: req.params.userId, 
        payment: true 
    })
    .populate("items.food")
    .sort({ createdAt: -1 }); // Show newest orders first

    res.json({ success: true, data: orders }); // Standardize response to 'data' or 'orders'
  } catch (err) {
    console.error("Fetch User Orders Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Only get name/email of the user
      .populate("items.food")
      .sort({ createdAt: -1 });
      
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new order (Manual/Testing)
router.post("/create", async (req, res) => {
  try {
    const { user, items, totalPrice, address } = req.body;
    
    // Ensure address is included as it is 'required' in your schema
    const order = new Order({ 
        user, 
        items, 
        totalPrice, 
        address 
    });
    
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update order status (Admin)
router.put("/status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete order (Admin)
router.delete("/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;