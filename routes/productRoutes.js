const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCountProducts,
} = require('../controllers/productController');
const router = express.Router();

router.route('/').post(createProduct).get(getProducts);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

router.get('/get/count', getCountProducts);

module.exports = router;
