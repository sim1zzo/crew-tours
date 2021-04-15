const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const { userSignUp, logIn, getMe } = require('../controllers/authController');
const router = express.Router();

router.post('/signUp', userSignUp);
router.post('/login', logIn);
router.get('/me', auth, getMe);

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .put(auth, updateUser)
  .delete([auth, admin], deleteUser);

module.exports = router;
