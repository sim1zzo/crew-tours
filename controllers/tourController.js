const fs = require("fs");
const path = `${__dirname}/../development-data/tours-example.json`
const tours = JSON.parse(fs.readFileSync(path, 'utf8'));
const { Tour, validate } = require('../models/tour');

exports.isValidTour = (req, res, next) => {
  if ((!req.body.name || !req.body.price)){
    return res.status(400).json({
      status: "Error",
      message: 'Invalid tour name or tour price'
    });
  }
  next();
}

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find().sort('name');
  if (!tours) return res.json({ message: 'error here' })
  res.json({
    status: 'OK',
    data: {
      tours
    }
  })
}

exports.getOneTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour)
    return res
      .status(404)
      .json(
        {
          status: 'Failed',
          message: "Invalid ID."
        });
  
  return res.json({
    status: 'OK',
    data: {
      tour
    }
  })
}

exports.createTour = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'Failed', messagge: error.details[0].message });

  const tour = new Tour({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  });
  try {
    await tour.save();
    return res.status(200).json({ status: 'OK', data: { tour } });
  } catch (error) {
    return res.status(500).json({ status: 'Error', message: error.message})
  }

};

exports.updateTour = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'Failed', messagge: error.details[0].message });
  
  const tour = await Tour.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  }, { new: true });
  
  res.status(200).json({
    status: 'Updated', data: {
    tour
  }});

};

exports.deleteTour = async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tours)
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });

  return res.status(200).json({ status: 'Deleted', deleted_tour: tour });
};

