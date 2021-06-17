const { Tour } = require('../models/tour');

exports.getOverview = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    tours,
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'First tour',
  });
};
