const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const mongoose = require('mongoose');
const multer = require('multer');
const asyncHandler = require('express-async-handler');

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

//@route    POST /api/v1/products
//@desc     Create New Product
//@access   Private
const createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).json({ msg: 'Category Not Found' });

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  res.status(200).json({ success: true, product });
});

//@route    GET /api/v1/products
//@desc     Get all products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') };
  }
  const products = await Product.find(filter).populate('category');
  res.status(200).json({ count: products.length, success: true, products });
});

//@route    GET /api/v1/products/:id
//@desc     Get product By ID
//@access   Public
const getProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product ID');
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ msg: 'Product Not Found' });
  res.status(200).json({ success: true, product });
});

//@route    GET /api/v1/products/get/count
//@desc     Get Count of products
//@access   Public
const getCountProducts = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);
  res.status(200).json({ success: true, productCount });
});

//@route    GET /api/v1/products/get/featured
//@desc     Get Count of products
//@access   Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    +count
  );
  res.status(200).json({ success: true, featuredProducts });
});

//@route    PUT /api/v1/products/:id
//@desc     Update a product
//@access   Private
const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product ID');
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).json({ msg: 'Category Not Found' });
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).json({ sucess: false, msg: 'Product not found' });
  res.status(200).json({ success: true, product });
});

//@route    DELETE /api/v1/products/:id
//@desc     Delete a product
//@access   Private
const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product ID');
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).json({ sucess: false, msg: 'Product not found' });
  res.status(200).json({ success: true, msg: 'Product deleted Successfully' });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getCountProducts,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
};
