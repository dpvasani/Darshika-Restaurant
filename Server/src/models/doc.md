Here is all my mongoose models

<!-- payment modal -->
const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = new Schema ({
    transitionId: String,
    email: String,
    price: Number, 
    quantity: Number,
    status: String,
    itemsName: Array,
    cartItems: Array,
    menuItems: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;

<!-- cart modal -->
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    menuItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    recipe: String,
    image: String, 
    price: Number,
    quantity: Number,
    email: {
        type: String,
        trim: true,
        required: true,
    }
});

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;

<!--  -->
And you given code is not correct, it's giving me emapty array:
const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); 

// middleware
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/', async (req, res) => {
    try {
        const result = await Payment.aggregate([
          {
            $unwind: '$menuItems'
          },
          {
            $group: {
              _id: '$menuItems.category',
              quantity: { $sum: 1 },
              revenue: { $sum: '$menuItems.price' }
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




<!-- payment  -->

{_id: "658520df7bc5b265cb1a5ca5",
    cartItems: ['658520277bc5b265cb1a5c93', '658520297bc5b265cb1a5c97', '6585202d7bc5b265cb1a5c9b'],
createdAt: "2023-12-22T05:38:39.039Z",
email: "kabir@j.com",
itemsName: ['Food ABC 2', 'Potato Salad', 'Haddock'],
menuItems:['6583ccee87fd08530bf7cf6d', '6581206e4b2abb80d9ceb957', '642c155b2c4774f05c36eeaa'],
price: 62.7,
quantity: 3,
status: "confirmed",
transitionId: "pi_3OQ1P8CfStF2l33717zaMB4V",
__v: 0,

}