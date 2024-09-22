import express from "express"; // Use 'import' instead of 'require'
import Menu from "../models/Menu.js"; // Ensure to include the '.js' extension
import {
  getAllMenuItems,
  postMenuItem,
  deleteMenu,
  singleMenuItem,
  updateMenuItem,
} from "../controllers/menuControllers.js"; // Use named imports
import verifyToken from "../middlewares/verifyToken.js"; // Add '.js' extension
import verifyAdmin from "../middlewares/verifyAdmin.js"; // Add '.js' extension

const router = express.Router();

// Get all menu items
router.get("/", getAllMenuItems);

// Post a menu item
router.post("/", verifyToken, verifyAdmin, postMenuItem);

// Delete a menu item
router.delete("/:id", verifyToken, verifyAdmin, deleteMenu);

// Get a single menu item
router.get("/:id", singleMenuItem);

// Update a menu item
router.patch("/:id", verifyToken, verifyAdmin, updateMenuItem);

// Export the router
export default router; // Use 'export default' instead of 'module.exports'
