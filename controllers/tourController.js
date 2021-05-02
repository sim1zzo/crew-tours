// const { response } = require('express');
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
  // .explain(); cheking stats for the specific query. Helps to index db.

  return res.json({
    status: 'Success',
    numbersOfTour: tours.length,
    data: {
      tours,
    },
  });
};

exports.getOneTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');
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

  const update = req.body;
  const tour = await Tour.findOneAndUpdate(req.params.id, update, {
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

// toursNearMe/:span/:latlong
exports.getToursNearMe = async (req, res) => {
  const { span, latlong } = req.params;
  const [lat, long] = latlong.split(',');
  const radius = span / 6378.1; // documentation examples. In case something is !working.
  if (!lat || !long || !span)
    return status(404).send('No latitude or longitute  or span provided.');
  // console.log(`lat ${lat},long ${long}, radius ${radius}`);

  // the code below is from the documentation. https://docs.mongodb.com/manual/reference/operator/query/centerSphere/#mongodb-query-op.-centerSphere
  const tours = await Tour.find({
    departureLocation: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
  });

  res.status(200).json({
    status: 'OK',
    quantity: tours.length,
    data: {
      tours,
    },
  });
};
