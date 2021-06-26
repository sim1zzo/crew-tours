const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Tour } = require('../models/tour');

exports.getCheckoutSession = async (req, res) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour)
    res.status(404).json({ status: 'error', message: 'No tour found' });

  // https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.description,
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json({ status: 'OK', session });
};
