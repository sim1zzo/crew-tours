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
  rating: {
    type: Number,
    default: 4.5
  }
});

const Tour = mongoose.model('Tour', tourSchema);

function validateTour(tour) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).unique().required(),
    price: Joi.number().required(),
    rating: Joi.number()
  });
  return schema.validate(user);
}

exports.Tour = Tour;
exports.validate = validateTour;

