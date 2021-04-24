const asyncCatch = require('../middlewares/asyncCatch');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const {
  getOneTour,
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourController');
const router = express.Router();

// router.param('/', isValidTour);

router
  .route('/')
  .get(asyncCatch(getAllTours))
  .post([auth, admin], asyncCatch(createTour));

router
  .route('/:id')
  .get(asyncCatch(getOneTour))
  .patch(auth, asyncCatch(updateTour))
  .delete([auth, admin], asyncCatch(deleteTour));

module.exports = router;
