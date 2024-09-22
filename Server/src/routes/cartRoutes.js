import express from "express"; // Use 'import' instead of 'require'
import {
  getCartByEmail,
  addToCarts,
  deleteCart,
  updateCart,
  getSingleCart,
} from "../controllers/cartControllers.js"; // Ensure to include the '.js' extension
import verifyToken from "../middlewares/verifyToken.js"; // Add '.js' extension
import verifyAdmin from "../middlewares/verifyAdmin.js"; // Add '.js' extension

const router = express.Router();

// Get all carts by email
router.get("/", verifyToken, getCartByEmail);

// Post cart item
router.post("/", addToCarts);

// Delete cart item
router.delete("/:id", deleteCart);

// Update cart quantity
router.put("/:id", updateCart);

// Get single cart item
router.get("/:id", getSingleCart);

export default router; // Use 'export default' instead of 'module.exports'
