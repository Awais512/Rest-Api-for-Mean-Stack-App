const express = require('express');

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);
router
  .route('/:id')
  .get(getSingleOrder)
  .put(updateOrderStatus)
  .delete(deleteOrder);

module.exports = router;
