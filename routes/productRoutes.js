const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCountProducts,
  getFeaturedProducts,
} = require('../controllers/productController');
const router = express.Router();

router.route('/').post(createProduct).get(getProducts);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

router.get('/get/count', getCountProducts);
router.get('/get/featured/:count', getFeaturedProducts);

module.exports = router;
