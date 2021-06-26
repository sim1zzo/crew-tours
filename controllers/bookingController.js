require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Tour } = require('../models/tour');

exports.getCheckoutSession = async (req, res) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour)
    res.status(404).json({ status: 'error', message: 'No tour found' });

  console.log(stripe);

  // https://stripe.com/docs/api/checkout/sessions/create
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'usd',
  //         amount: tour.price * 100,
  //         product_data: {
  //           name: `${tour.name} Tour`,
  //           description: tour.description,
  //         },
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   customer_email: req.user.email,
  //   client_reference_id: req.params.id,
  //   success_url: `${req.protocol}://${req.get('host')}/`,
  //   cancel_url: `${req.protocol}://${req.get('host')}/tours`,
  // });

  res.status(200).json({ status: 'OK' });
};
