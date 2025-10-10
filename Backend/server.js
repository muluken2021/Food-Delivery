import express from 'express';
import cors from 'cors';
import { connectDB } from './config/Db.js';
import admin from './routes/admin.js';
import FoodRouter from './routes/FoodRouter.js';
import UserRouter from './routes/User.js'; // import user routes
import OrderRouter from "./routes/OrderRouter.js";
import ContactRouter from "./routes/ContactRouter.js";
import path from 'path';


// hash.js
import bcrypt from'bcrypt';

async function hashPassword(plain) {
  const saltRounds = 12; // 10-12 is typical; increase for more cost
  const hash = await bcrypt.hash(plain, saltRounds);
  return hash;
}

// Example usage: node hash.js admin123
(async () => {
  const plain = process.argv[2] || 'admin123';
  try {
    const hashed = await hashPassword(plain);
    console.log('Plain:', plain);
    console.log('Hash :', hashed);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();


// Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use('/api/food', FoodRouter);
app.use('/api/user', UserRouter); // add user routes
app.use("/api/orders", OrderRouter);
app.use("/api/admin/", admin);
app.use("/api/contact", ContactRouter);


app.use('/images', express.static('uploads')); // make sure folder is "uploads"

// ✅ Serve "uploads" folder as static
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Test Route
app.get('/', (req, res) => {
    res.send("API is working....");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Listening at port ${port}`);
});
