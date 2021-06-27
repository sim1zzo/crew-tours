const { Tour } = require('../models/tour');

exports.getCheckoutSession = async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // console.log(`Stipe: ${stripe}`);
  const tour = await Tour.findById(req.params.tourId);
  if (!tour)
    res.status(404).json({ status: 'error', message: 'No tour found' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    cancel_url: `${req.protocol}://${req.get('host')}/`,
    success_url: `${req.protocol}://${req.get('host')}/tour/${
      tour.name.split(' ')[0]
    }`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
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

  res.status(200).json({
    status: 'success',
    session,
  });
};
