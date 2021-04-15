const auth = require('../middlewares/auth');
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
router
  .route('/:id')
  .get(getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
