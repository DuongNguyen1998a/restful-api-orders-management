const express = require('express');
const router = express.Router();
const orderItemService = require('../services/order_items_service');

router.get('/', async (req, res) => {
    await orderItemService.getOrderDetails(res);
});

router.get('/:orderId', async(req, res) => {
    await orderItemService.getOrderDetail(req, res);
});

router.post('/', async(req, res) => {
    await orderItemService.createNewOrderItem(req, res);
});

router.patch('/OrderId=:orderId&ItemId=:itemId', async(req, res) => {
    await orderItemService.updateOrderItem(req, res);
});

router.delete('/OrderId=:orderId&ItemId=:itemId', async(req, res) => {
    await orderItemService.deleteOrderItem(req, res);
});

module.exports = router;