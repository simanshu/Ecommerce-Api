const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

// Apply authentication middleware to protect cart-related routes

router.post('/cart',cartController.addToCart);
router.get('/cart',cartController.getCart);
router.put('/cart/:item_id', cartController.updateCartItem);
router.delete('/cart/:item_id', cartController.removeFromCart);

module.exports = router;
