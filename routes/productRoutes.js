const express = require('express');
const multer = require('multer');

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCountProducts,
  getFeaturedProducts,
  addGalleryImagesToProduct,
} = require('../controllers/productController');
const router = express.Router();

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid File Type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}_${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.route('/').post(upload.single('image'), createProduct).get(getProducts);

router
  .route('/:id')
  .get(getProduct)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

router.get('/get/count', getCountProducts);
router.get('/get/featured/:count', getFeaturedProducts);

router.put(
  '/gallery/:id',
  upload.array('images', 10),
  addGalleryImagesToProduct
);

module.exports = router;
