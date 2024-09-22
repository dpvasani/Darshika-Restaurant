const express = require('express');
const Carts = require('../models/Carts');
const router = express.Router();

const cartController = require('../controllers/cartControllers');

const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/',verifyToken, (req, res) => {
    cartController.getCartByEmail(req, res)
});
// post cart item
router.post('/', cartController.addToCarts);

// delete cart item
router.delete('/:id', cartController.deleteCart)

// update cart quantity
router.put('/:id', cartController.updateCart);

// get single cart item
router.get('/:id', cartController.getSingleCart);

module.exports = router;