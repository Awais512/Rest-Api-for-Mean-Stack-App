const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  getUserCount,
} = require('../controllers/userController');

router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser);
router.get('/get/count', getUserCount);

module.exports = router;
