const mongoose = require('mongoose');
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Every tour has to have a name'],
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Every tour has to have a price'],
      get: (t) => Math.round(t),
      set: (t) => Math.round(t),
    },
    tourRating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    duration: {
      type: Number,
      required: [true, 'Every tour has to have a duration'],
    },
    description: {
      type: String,
      trim: true,
    },
    coverPicture: {
      type: String,
      required: [true, 'Tour has to have a picture'],
    },
    pictures: [String],
    maxNumberOfParticipant: Number,
    tourDates: [Date],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    departureLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number], // long and lat
      formattedAddress: String,
      summary: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        formattedAddress: String,
        summary: String,
        day: Number,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(), // this can even be retrieved by the object id.
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1 });

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-password -password2 -__v',
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

function validateTour(tour) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    price: Joi.number().required(),
    tourRating: Joi.number(),
    duration: Joi.number().required(),
    description: Joi.string(),
    coverPicture: Joi.string().required(),
    pictures: Joi.array().required(),
    tourDates: Joi.array().items(Joi.date()),
    maxNumberOfParticipant: Joi.number(),
    guides: Joi.array().items(Joi.objectId),
    departureLocation: Joi.object().keys({
      type: Joi.string().default(['Point']),
      coordinates: Joi.array().items(Joi.number()),
      summary: Joi.string(),
      formattedAddress: Joi.string(),
    }),
    locations: Joi.array().items(
      Joi.object().keys({
        type: Joi.string().default(['Point']),
        coordinates: Joi.array().items(Joi.number()),
        summary: Joi.string(),
        formattedAddress: Joi.string(),
        day: Joi.number(),
      })
    ),
  });
  return schema.validate(tour);
}

exports.Tour = Tour;
exports.validate = validateTour;
