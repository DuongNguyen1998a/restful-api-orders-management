const express = require('express');
const router = express.Router();
const customerService = require('../services/customers_service');


// Get All Customers
router.get('/', async (req, res) => {
    await customerService.getCustomers(res);
});

// Get Customer
router.get('/:customerId', async (req, res) => {
    await customerService.getCustomer(req, res);
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