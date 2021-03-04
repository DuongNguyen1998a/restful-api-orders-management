const express = require('express');
const router = express.Router();
const productService = require('../services/products_service');

// Get Products
router.get('/', async(req, res) => {
    await productService.getProducts(res);
});

// Get Product
router.get('/:productId', async(req, res) => {
    await productService.getProduct(req, res);
});

// Create New Product
router.post('/', async(req, res) => {
    await productService.createNewProduct(req, res);
});

// Update Product
router.patch('/:productId', async(req, res) => {
    await productService.updateProduct(req, res);
});

// Delete Product
router.delete('/:productId', async(req, res) => {
    await productService.deleteProduct(req, res);
});

module.exports = router;