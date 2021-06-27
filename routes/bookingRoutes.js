const express = require('express');
const auth = require('../middlewares/auth');
const asyncCatch = require('../middlewares/asyncCatch');
const { getCheckoutSession } = require('./../controllers/bookingController');

const router = express.Router();

router.get('/checkout-session/:tourId', auth, asyncCatch(getCheckoutSession));

module.exports = router;
