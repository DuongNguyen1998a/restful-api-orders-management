const express = require('express');
const router = express.Router();
const orderService = require('../services/orders_service');

// Get Orders
router.get('/', async (req, res) => {
    await orderService.getOrders(res);
});

// Get Order
router.get('/:orderId', async (req, res) => {
    await orderService.getOrder(req, res);
});

// Create New Order
router.post('/', async(req, res) => {
    await orderService.createNewOrder(req, res);
});

// Update Order
router.patch('/:orderId', async(req, res) => {
    await orderService.updateOrder(req, res);
});

// Delete Order
router.delete('/:orderId', async(req, res) => {
    await orderService.deleteOrder(req, res);
});

module.exports = router;