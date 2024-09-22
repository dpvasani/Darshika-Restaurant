import express from "express"; // Use 'import' instead of 'require'
import User from "../models/User.js"; // Ensure to include the '.js' extension
import Menu from "../models/Menu.js"; // Include the '.js' extension
import Payment from "../models/Payments.js"; // Include the '.js' extension

// Middleware imports
import verifyToken from "../middlewares/verifyToken.js"; // Include the '.js' extension
import verifyAdmin from "../middlewares/verifyAdmin.js"; // Include the '.js' extension

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: "$menuItems",
      },
      {
        $lookup: {
          from: "menus", // Assuming the menu collection name is 'menus'
          localField: "menuItems",
          foreignField: "_id",
          as: "menuItemDetails",
        },
      },
      {
        $unwind: "$menuItemDetails",
      },
      {
        $group: {
          _id: "$menuItemDetails.category",
          quantity: { $sum: "$quantity" },
          revenue: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router; // Use 'export default' instead of 'module.exports'
