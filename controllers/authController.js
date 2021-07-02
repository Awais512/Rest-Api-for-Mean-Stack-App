const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@route    POST /api/v1/auth/register
//@desc     Register a User
//@access   Public
const register = asyncHandler(async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
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
const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.JWT_SECRET;
  if (!user) return res.status(400).json({ msg: 'User not found' });

  //Compare Password
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(400).send('Invalid Password');
  }
});

module.exports = { register, login };
