const asyncCatch = require('../middlewares/asyncCatch');
const isLoggedIn = require('../middlewares/isLoggedIn');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const checkout = require('../middlewares/checkout');
const {
  getOverview,
  getTour,
  getLogin,
  getAccount,
  getMyTours,
  getSignUp,
  getWelcome,
  getAllUsers,
} = require('../controllers/viewsController');
const router = express.Router();

router.use(isLoggedIn);
router.get('/', checkout, asyncCatch(getWelcome));
router.get('/tours', checkout, asyncCatch(getOverview));
router.get('/tour/*', asyncCatch(getTour));
router.get('/login', asyncCatch(getLogin));
router.get('/signup', asyncCatch(getSignUp));
router.get('/me', auth, asyncCatch(getAccount));
router.get('/my-bookings', auth, asyncCatch(getMyTours));
router.get('/allusers', [auth, admin], asyncCatch(getAllUsers));

module.exports = router;
