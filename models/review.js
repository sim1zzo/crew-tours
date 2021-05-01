const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
    required: [true, 'all tour must come with a review'],
  },
  rates: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'each review must have a reference tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'each user must have a reference user'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    review: Joi.string().required(),
    rates: Joi.number().required(),
    tour: Joi.objectId().required(),
    user: Joi.objectId().required(),
  });
  return schema.validate(review);
}

exports.Review = Review;
exports.validate = validateReview;
