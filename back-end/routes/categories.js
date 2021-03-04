const express = require('express');
const router = express.Router();
const categoriesService = require('../services/categories_service');

// Get Categories
router.get('/', async (req, res) => {
    await categoriesService.getCategories(res);
});

// Get Category
router.get('/:categoryId', async (req, res) => {
    await categoriesService.getCategory(req, res);
});

// Create New Category
router.post('/', async(req, res) => {
    await categoriesService.createNewCategory(req, res);
});

// Update Category
router.patch('/:categoryId', async(req, res) => {
    await categoriesService.updateCategory(req, res);
});

// Delete Category
router.delete('/:categoryId', async(req, res) => {
    await categoriesService.deleteCategory(req, res);
});

module.exports = router;