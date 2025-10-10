import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mulukenkassaw1996@gmail.com",
        pass: process.env.EMAIL_PASS, // Make sure your .env has EMAIL_PASS=your-app-password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "mulukenkassaw1996@gmail.com",
      subject: `Contact Form Message from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

export default router;
