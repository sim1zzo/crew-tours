const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const { userSignUp, logIn } = require('../controllers/authController');
const router = express.Router();

router.post('/signUp', userSignUp);
router.post('/login', logIn);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
