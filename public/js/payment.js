import axios from 'axios';
// import Stripe from 'stripe';
// const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/bookings/checkout-session/${tourId}`);
    // console.log(session.data.session.url);
    if (session.data.status === 'success') {
      window.setTimeout(() => {
        location.assign(session.data.session.url);
      }, 1500);
    }
  } catch (err) {
    // console.log(err.message);
    alert('An error occurred', err);
  }
};
