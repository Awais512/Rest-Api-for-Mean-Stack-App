const express = require('express');

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getTotalCount,
  getUserOrders,
} = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);
router
  .route('/:id')
  .get(getSingleOrder)
  .put(updateOrderStatus)
  .delete(deleteOrder);

router.get('/get/sales', getTotalSales);
router.get('/get/count', getTotalCount);
router.get('/userorders/:userid', getUserOrders);

module.exports = router;
