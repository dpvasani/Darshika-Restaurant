const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); // Corrected import statement

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', async (req, res) => {
  try {
    const result = await Payment.aggregate([
        {
          $unwind: '$menuItems'
        },
        {
          $lookup: {
            from: 'menus', // Assuming the menu collection name is 'menus'
            localField: 'menuItems',
            foreignField: '_id',
            as: 'menuItemDetails'
          }
        },
        {
          $unwind: '$menuItemDetails'
        },
        {
          $group: {
            _id: '$menuItemDetails.category',
            quantity: { $sum: '$quantity' },
            revenue: { $sum: '$price' }
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            quantity: '$quantity',
            revenue: '$revenue'
          }
        }
      ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
