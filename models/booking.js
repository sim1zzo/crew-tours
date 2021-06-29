const mongoose = require('mongoose');
const Joi = require('joi');

const bookingScherma = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'A booking must be part of a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A booking must have a user'],
  },
  price: {
    type: Number,
    required: true,
    get: (t) => Math.round(t),
    set: (t) => Math.round(t),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

// pre populate the booking
bookingScherma.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingScherma);

function validateBooking(booking) {
  const schema = Joi.object({
    tour: Joi.ObjectId.required(),
    user: Joi.ObjectId.required(),
    price: Joi.number().required(),
    paid: Joi.boolean(),
  });
  return schema.validate(booking);
}

exports.Booking = Booking;
exports.validate = validateBooking;
