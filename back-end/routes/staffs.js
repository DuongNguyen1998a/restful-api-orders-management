const express = require('express');
const router = express.Router();
const staffService = require('../services/staffs_service');

// Get All Staffs
router.get('/', async (req, res) => {
    await staffService.getStaffs(res);
});

// Get Staff
router.get('/:staffId', async (req, res) => {
    await staffService.getStaff(req, res);
});

// Create New Staff
router.post('/', async(req, res) => {
    await customerService.createNewCustomer(req, res);
});

// Update Staff
router.patch('/:staffId', async(req, res) => {
    await customerService.updateCustomer(req, res);
});

// Delete Staff
router.delete('/:staffId', async(req, res) => {
    await customerService.deleteCustomer(req, res);
});

module.exports = router;