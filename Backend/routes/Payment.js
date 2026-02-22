import express from 'express';
import Stripe from 'stripe';
import orderModel from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
console.log(process.env.STRIPE_SECRET_KEY);

router.post('/place', async (req, res) => {
    const { userId, items, amount, address } = req.body;
    const frontend_url = process.env.CLIENT_URL;

    try {
        // 1. Format items to match Schema: { food: id, quantity: n }
        const formattedItems = items.map(item => ({
            food: item._id, 
            quantity: item.quantity
        }));

        // 2. Create the Order in MongoDB
        const newOrder = new orderModel({
            user: userId,          // Maps userId -> user
            items: formattedItems, // Maps _id -> food
            totalPrice: amount,    // Maps amount -> totalPrice
            address: address,      
        });
        
        await newOrder.save();

        // 3. Prepare Stripe Line Items (Stripe needs cents)
        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100) 
            },
            quantity: item.quantity
        }));

        // Add Delivery Charges line item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 
            },
            quantity: 1
        });

        // 4. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            // Redirects to /verify to handle the database update after payment
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Payment Route Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/verify", async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Update the payment status in MongoDB
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Verified Successfully" });
        } else {
            // If payment failed, we usually delete the pending order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Cancelled" });
        }
    } catch (error) {
        console.error("Verify API Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;