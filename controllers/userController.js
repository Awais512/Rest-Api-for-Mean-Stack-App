const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//@route      GET /api/v1/users
//@desc       Get all Users
//@access     Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.status(200).json(users);
});

//@route      GET /api/v1/users/:id
//@desc       Get Single Users
//@access     Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.status(200).json(user);
});

module.exports = { getUsers, getUser };
