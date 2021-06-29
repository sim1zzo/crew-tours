const { Booking } = require('../models/booking');

module.exports = async function (req, res, next) {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();
  const booking = await Booking.create({ tour, user, price });
  if (booking) {
    res.redirect('/');
  }
  next();
};
