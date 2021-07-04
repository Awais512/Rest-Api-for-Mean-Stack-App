const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//@route      GET /api/v1/users
//@desc       Get all Users
//@access     Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.status(200).json({ count: users.length, success: true, users });
});

//@route      GET /api/v1/users/:id
//@desc       Get Single Users
//@access     Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.status(200).json(user);
});

//@route      PUT /api/v1/users/:id
//@desc       Update Single Users
//@access     Private
const updateUser = asyncHandler(async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );

  if (!user) return res.status(400).send('the user cannot be created!');

  res.send(user);
});

//@route      GET /api/v1/users/get/count
//@desc       Get Single Users
//@access     Public
const getUserCount = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  res.send({
    userCount: userCount,
  });
});

module.exports = { getUsers, getUser, updateUser, getUserCount };
