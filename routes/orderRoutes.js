const express = require('express');

const router = express.Router();

const { createOrder, getAllOrders } = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);

module.exports = router;
