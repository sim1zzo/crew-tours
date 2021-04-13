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

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getOneTour).patch(updateTour).delete(deleteTour);

module.exports = router;
