const express = require('express');
const router = express.Router();
const brandService = require('../services/brands_service');

// Get Brands
router.get('/', async (req, res) => {
    await brandService.getBrands(res);
});

// Get Brand
router.get('/:brandId', async (req, res) => {
    await brandService.getBrand(req, res);
});

// Create New Brand
router.post('/', async(req, res) => {
    await brandService.craeteNewBrand(req, res);
});

// Update Brand
router.patch('/:brandId', async(req, res) => {
    await brandService.udpateBrand(req, res);
});

// Delete Brand
router.delete('/:brandId', async(req, res) => {
    await brandService.deleteBrand(req, res);
});

module.exports = router;