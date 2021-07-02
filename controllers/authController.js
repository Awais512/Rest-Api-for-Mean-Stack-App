const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//@route    POST /api/v1/auth/register
//@desc     Register a User
//@access   Public
const register = asyncHandler(async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();
  res.status(200).json(user);
});

//@route    POST /api/v1/auth/login
//@desc       Register a User
//@access     Public
const login = asyncHandler(async (req, res) => {});

module.exports = { register, login };
