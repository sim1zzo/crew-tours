const express = require('express');
const { getOneTour, getAllTours, createTour, deleteTour } = require('../controllers/tourController');
const router = express.Router();


router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
.route('/:id')
.get(getOneTour)
.delete(deleteTour);

module.exports = router;