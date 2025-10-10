// routes/OrderRouter.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create new order
router.post("/create", async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;
    const order = new Order({ user, items, totalPrice });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.food");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.food");
    res.json({ success: true, orders });
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
