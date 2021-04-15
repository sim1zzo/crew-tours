const { Tour, validate } = require('../models/tour');

exports.getAllTours = async (req, res) => {
  const queryObj = { ...req.query };
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|eq|ne)\b/g,
    (match) => `$${match}`
  );
  const tours = await Tour.find(JSON.parse(queryString))
    .sort('name -price ')
    .select('-__v');
  return res.json({
    status: 'Success',
    numbersOfTour: tours.length,
    data: {
      tours,
    },
  });
};

exports.getOneTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour)
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID.',
    });

  return res.json({
    status: 'OK',
    data: {
      tour,
    },
  });
};

exports.createTour = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(404)
      .json({ status: 'Failed', messagge: error.details[0].message });

  const tour = await Tour.create(req.body);
  return res.status(201).json({ status: 'OK', data: { tour } });
};

exports.updateTour = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 'Failed', messagge: error.details[0].message });

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: 'Updated',
    data: {
      tour,
    },
  });
};

exports.deleteTour = async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: 'Deleted', tour });
};
