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

router.route('/').get(getAllTours).post(auth, createTour);

router
  .route('/:id')
  .get(getOneTour)
  .patch(auth, updateTour)
  .delete([auth, admin], deleteTour);

module.exports = router;
