const { Product } = require('../models/Product');

//@route    POST /api/v1/products
//@desc     Create New Product
//@access   Private
const createProduct = async (req, res) => {};

//@route    GET /api/v1/products
//@desc     Get all products
//@access   Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@route    GET /api/v1/products/:id
//@desc     Get product By ID
//@access   Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product Not Found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@route    PUT /api/v1/products/:id
//@desc     Update a product
//@access   Private
const updateProduct = async (req, res) => {};

//@route    DELETE /api/v1/products/:id
//@desc     Delete a product
//@access   Private
const deleteProduct = async (req, res) => {};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
