import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Schema matches the 'user' and 'food' requirements from your error log
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    address: { type: Object, required: true }, 
    status: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

// This ensures we don't overwrite the model if it already exists
const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;