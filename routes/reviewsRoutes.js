const asyncCatch = require('../middlewares/asyncCatch');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');

const {
  getOneOrAllReviews,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(asyncCatch(getOneOrAllReviews))
  .post(auth, asyncCatch(createReview));

router
  .route('/:id')
  .patch(auth, asyncCatch(updateReview))
  .delete(auth, asyncCatch(deleteReview));

module.exports = router;
