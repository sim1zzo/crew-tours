const express = require('express');
const auth = require('../middlewares/auth');
const { getCheckoutSession } = require('./../controllers/bookingController');

const router = express.Router();

router.get('/checkout-session/:tourId', auth, getCheckoutSession);

module.exports = router;