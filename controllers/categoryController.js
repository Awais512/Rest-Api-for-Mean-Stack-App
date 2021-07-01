const { Category } = require('../models/Category');
const asyncHandler = require('express-async-handler');

//@route    POST /api/v1/categories
//@desc     Create New Category
//@access   Private
const createCategory = asyncHandler(async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  res.send(category);
});

//@route    GET /api/v1/categories
//@desc     Get all categories
//@access   Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

//@route    GET /api/v1/categories/:id
//@desc     Get category By ID
//@access   Public
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ msg: 'Category Not Found' });
  res.status(200).json(category);
});

//@route    PUT /api/v1/categories/:id
//@desc     Update a product
//@access   Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category)
    return res.status(404).json({ sucess: false, msg: 'Category not found' });
  res.status(200).json(category);
});

//@route    DELETE /api/v1/categories/:id
//@desc     Delete a product
//@access   Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).json({ sucess: false, msg: 'Category not found' });
  res.status(200).json({ success: true, msg: 'Category deleted Successfully' });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
