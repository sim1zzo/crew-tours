const asyncCatch = require('../middlewares/asyncCatch');
const isLoggedIn = require('../middlewares/isLoggedIn');
const auth = require('../middlewares/auth');
const express = require('express');
const {
  getOverview,
  getTour,
  getLogin,
  getSignUp,
} = require('../controllers/viewsController');
const router = express.Router();

router.use(isLoggedIn);
router.get('/', asyncCatch(getOverview));
router.get('/tour/*', asyncCatch(getTour));
router.get('/login', asyncCatch(getLogin));
// router.get('/singup', asyncCatch(getSignUp));

module.exports = router;
