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
    await staffService.createNewStaff(req, res);
});

// Update Staff
router.patch('/:staffId', async(req, res) => {
    await staffService.updateStaff(req, res);
});

// Delete Staff
router.delete('/:staffId', async(req, res) => {
    await staffService.deleteStaff(req, res);
});

module.exports = router;