const express = require('express');
const { getOneTour, getAllTours, createTour, deleteTour, isValidTour } = require('../controllers/tourController');
const router = express.Router();

router.param('/', isValidTour);

router
  .route('/')
  .get(getAllTours)
  .post(isValidTour,createTour);

router
.route('/:id')
.get(getOneTour)
.delete(deleteTour);

module.exports = router;