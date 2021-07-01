const { Product } = require('../models/Product');
const asyncHandler = require('express-async-handler');

//@route    POST /api/v1/products
//@desc     Create New Product
//@access   Private
const createProduct = asyncHandler(async (req, res) => {});

//@route    GET /api/v1/products
//@desc     Get all products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//@route    GET /api/v1/products/:id
//@desc     Get product By ID
//@access   Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product Not Found' });
  res.status(200).json(product);
});

//@route    PUT /api/v1/products/:id
//@desc     Update a product
//@access   Private
const updateProduct = asyncHandler(async (req, res) => {});

//@route    DELETE /api/v1/products/:id
//@desc     Delete a product
//@access   Private
const deleteProduct = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
