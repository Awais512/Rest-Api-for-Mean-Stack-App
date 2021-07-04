const express = require('express');

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
} = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getSingleOrder);

module.exports = router;
