const asyncCatch = require('../middlewares/asyncCatch');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const reviewRouter = require('../routes/reviewsRoutes');
const express = require('express');
const {
  getOneTour,
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getToursNearMe,
} = require('../controllers/tourController');
const router = express.Router();

router.use('/:id/reviews', reviewRouter);

router
  .route('/')
  .get(asyncCatch(getAllTours))
  .post([auth, admin], asyncCatch(createTour));

router
  .route('/:id')
  .get(asyncCatch(getOneTour))
  .patch([auth, admin], asyncCatch(updateTour))
  .delete([auth, admin], asyncCatch(deleteTour));

router.route('/nearMe/:span/:latlong').get(asyncCatch(getToursNearMe));

module.exports = router;
