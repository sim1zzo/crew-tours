const asyncCatch = require('../middlewares/asyncCatch');
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

router.post('/signUp', asyncCatch(userSignUp));
router.post('/login', asyncCatch(logIn));
router.get('/me', auth, asyncCatch(getMe));

router.route('/').get(asyncCatch(getAllUsers)).post(asyncCatch(createUser));
router
  .route('/:id')
  .get([auth, admin], asyncCatch(getUser)) // this will prevent a random user to insert an id and receive information that are not supposed to be showned.
  .put(auth, asyncCatch(updateUser))
  .delete([auth, admin], asyncCatch(deleteUser));

module.exports = router;
