const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.post('/categories', productController.createCategory);
router.get('/categories', productController.getCategories);


router.post('/products', productController.createProduct);
router.get('/products/:category_id', productController.getProductsByCategory);
router.get('/product/:product_id', productController.getProductDetails);

module.exports = router;
