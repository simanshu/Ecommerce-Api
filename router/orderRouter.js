const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/order', orderController.placeOrder);
router.get('/orders', orderController.getOrderHistory);

module.exports = router;
