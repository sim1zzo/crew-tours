const asyncCatch = require('../middlewares/asyncCatch');
const express = require('express');
const { getOverview, getTour } = require('../controllers/viewsController');
const router = express.Router();

router.get('/', asyncCatch(getOverview));
router.get('/tour/*', getTour);

module.exports = router;
