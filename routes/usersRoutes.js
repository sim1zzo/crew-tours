const express = require('express');
const asyncCatch = require('../middlewares/asyncCatch');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getAllGuides,
  uploadUserPhoto,
} = require('../controllers/userController');

const {
  userSignUp,
  logIn,
  logOut,
  getMe,
  resetPassword,
  forgottenPassword,
  changeRole,
  changePassword,
} = require('../controllers/authController');

const router = express.Router();

router.get('/me', auth, asyncCatch(getMe));
router.get('/guides', [auth, admin], asyncCatch(getAllGuides));
router.post('/signUp', asyncCatch(userSignUp));
router.get('/logout', asyncCatch(logOut));
router.post('/login', asyncCatch(logIn));
router.patch('/changePassword', auth, asyncCatch(changePassword));
router.post('/forgottenPassword', asyncCatch(forgottenPassword));
router.patch('/resetPassword/:token', asyncCatch(resetPassword));
router.patch('/changeRole', [auth, admin], asyncCatch(changeRole));
router.patch('/updateMe', [auth], uploadUserPhoto, asyncCatch(updateUser));

router.route('/').get([auth, admin], asyncCatch(getAllUsers)); //.post(asyncCatch(createUser))

router
  .route('/:id')
  .get([auth, admin], asyncCatch(getUser)) // this will prevent a random user to insert an id and receive information that are not supposed to be showned.
  .delete([auth], asyncCatch(deleteUser));

module.exports = router;
