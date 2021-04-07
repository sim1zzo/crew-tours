const mongoose = require('mongoose');
const Joi = require('joi');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Every tour has to have a name'],
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Every tour has to have a price']
  },
  tourRating: {
    type: Number,
    default: 4.5
  },
  duration: {
    type: Number,
    required: [true, 'Every tour has to have a duration']
  },
  tourReview: {
    type: Number,
    default:0
  },
  description: {
    type: String,
    trim: true
  },
  coverPicture: {
    type: String,
    required: [true, "Tour has to have a picture"]
  },
  pictures: [String],
  maxNumberOfParticipant: Number,
  tourDates :[Date]
});

const Tour = mongoose.model('Tour', tourSchema);

function validateTour(tour) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    price: Joi.number().required(),
    tourRating: Joi.number(),
    duration: Joi.number().required(),
    tourReview: Joi.number(),
    description: Joi.string(),
    coverPicture: Joi.string().required(),
    pictures: Joi.array().required(),
    tourDates: Joi.array().items(Joi.date()),
    maxNumberOfParticipant: Joi.number()
  });
  return schema.validate(tour);
}

exports.Tour = Tour;
exports.validate = validateTour;

