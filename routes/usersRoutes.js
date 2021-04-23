const asyncCatch = require('../middlewares/asyncCatch');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const {
  getAllUsers,
  // createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const {
  userSignUp,
  logIn,
  getMe,
  resetPassword,
  forgottenPassword,
  changeRole,
} = require('../controllers/authController');
const router = express.Router();

router.get('/me', auth, asyncCatch(getMe));
router.post('/signUp', asyncCatch(userSignUp));
router.post('/login', asyncCatch(logIn));
router.patch('/forgottenPassword', asyncCatch(forgottenPassword));
router.put('/resetPassword', auth, asyncCatch(resetPassword));
router.patch('/changeRole', [auth, admin], asyncCatch(changeRole));

router.route('/').get(asyncCatch(getAllUsers)); //.post(asyncCatch(createUser))

router
  .route('/:id')
  .get([auth, admin], asyncCatch(getUser)) // this will prevent a random user to insert an id and receive information that are not supposed to be showned.
  .patch(auth, asyncCatch(updateUser))
  .delete([auth], asyncCatch(deleteUser));

module.exports = router;
