//@route    POST /api/v1/products
//@desc     Create New Product
//@access   Private
const createProduct = async (req, res) => {};

//@route    GET /api/v1/products
//@desc     Get all products
//@access   Public
const getProducts = async (req, res) => {
  res.send('Hiiiii');
};

//@route    GET /api/v1/products/:id
//@desc     Get product By ID
//@access   Public
const getProduct = async (req, res) => {};

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
