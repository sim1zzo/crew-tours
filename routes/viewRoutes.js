const asyncCatch = require('../middlewares/asyncCatch');
const isLoggedIn = require('../middlewares/isLoggedIn');
const auth = require('../middlewares/auth');
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

module.exports = router;
