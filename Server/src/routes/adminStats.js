import express from "express"; // Use 'import' instead of 'require'
import User from "../models/User.js"; // Ensure to include the '.js' extension
import Menu from "../models/Menu.js";
import Payment from "../models/Payments.js";

// Import your middleware
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.json({
      users,
      menuItems,
      orders,
      revenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router; // Use 'export default' instead of 'module.exports'
