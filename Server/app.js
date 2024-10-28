// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import stripe from "stripe";

// Route Imports
import menuRoutes from "./src/routes/menuRoutes.js";
import cartsRoutes from "./src/routes/cartRoutes.js";
import usersRoutes from "./src/routes/userRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import adminStats from "./src/routes/adminStats.js";
import orderStats from "./src/routes/orderStats.js";

// Middleware
import verifyToken from "./src/middlewares/verifyToken.js";

dotenv.config();

const app = express();
const stripeClient = stripe(process.env.PAYMENT_SECRET_KEY);
const PORT = process.env.PORT || 5000;

// Check for environment variables
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.PAYMENT_SECRET_KEY) {
  console.warn("Missing essential environment variables!");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// JWT Route
app.post("/jwt", async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate token" });
  }
});

// Payment Route with Stripe Integration
app.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100; // Stripe expects amounts in cents
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: "Payment initiation failed" });
  }
});

// Route Handlers
app.use("/menu", menuRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin-stats", adminStats);
app.use("/order-stats", orderStats);

// Root Route
app.get("/", (req, res) => {
  res.send("Darshika Server is Running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
