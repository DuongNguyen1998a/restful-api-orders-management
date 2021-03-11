const express = require('express');
const router = express.Router();
const stocksService = require('../services/stocks_service');

// Get Stocks
router.get('/', async(req, res) => {
    await stocksService.getStocks(res);
});

// Get Stock (storeId, productId)
router.get('/storeId=:storeId&productId=:productId', async(req, res) => {
    await stocksService.getStock(req, res);
});

// Create New Stock
router.post('/', async(req, res) => {
    await stocksService.createNewStock(req, res);
});

// Update Stock
router.patch('/storeId=:storeId&productId=:productId', async(req, res) => {
    await stocksService.updateStock(req, res);
});

// Delete Store
router.delete('/:storeId', async(req, res) => {
    await storeService.deleteStore(req, res);
});

module.exports = router;