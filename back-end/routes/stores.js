const express = require('express');
const router = express.Router();
const storeService = require('../services/stores_service');

// Get Stores
router.get('/', async(req, res) => {
    await storeService.getStores(res);
});

// Get Store
router.get('/:storeId', async(req, res) => {
    await storeService.getStore(req, res);
});

// Create New Store
router.post('/', async(req, res) => {
    await storeService.createNewStore(req, res);
});

// Update Store
router.patch('/:storeId', async(req, res) => {
    await storeService.updateStore(req, res);
});

// Delete Store
router.delete('/:storeId', async(req, res) => {
    await storeService.deleteStore(req, res);
});

module.exports = router;