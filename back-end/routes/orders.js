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

// Create New Customer
router.post('/', async(req, res) => {
    await customerService.createNewCustomer(req, res);
});

// Update Customer
router.patch('/:customerId', async(req, res) => {
    await customerService.updateCustomer(req, res);
});

// Delete Customer
router.delete('/:customerId', async(req, res) => {
    await customerService.deleteCustomer(req, res);
});

module.exports = router;