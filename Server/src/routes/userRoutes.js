import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
} from "../controllers/userControllers.js"; // Include the '.js' extension
import verifyToken from "../middlewares/verifyToken.js"; // Include the '.js' extension
import verifyAdmin from "../middlewares/verifyAdmin.js"; // Include the '.js' extension

const router = express.Router();

// Get all users
router.get("/", verifyToken, verifyAdmin, getAllUsers);

// Create a new user
router.post("/", createUser);

// Delete a user
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

// Get admin
router.get("/admin/:email", verifyToken, getAdmin);

// Make admin
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);

export default router; // Use 'export default' instead of 'module.exports'
