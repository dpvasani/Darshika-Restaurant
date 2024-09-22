// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import menuRoutes from "./src/routes/menuRoutes.js";
import cartsRoutes from "./src/routes/cartRoutes.js";
import usersRoutes from "./src/routes/userRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import adminStats from "./src/routes/adminStats.js";
import orderStats from "./src/routes/orderStats.js";
import verifyToken from "./src/middlewares/verifyToken.js";
import stripe from "stripe";

dotenv.config();

const app = express();
const stripeClient = stripe(process.env.PAYMENT_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

app.use("/menu", menuRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin-stats", adminStats);
app.use("/order-stats", orderStats);

app.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.get("/", (req, res) => {
  res.send("Darshika Server is Running!");
});

export default app;
