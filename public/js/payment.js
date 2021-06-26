// const bookBtn = document.getElementById('book-tour');
import axios from 'axios';
import Stripe from 'stripe';
const stripe = new Stripe(
  'pk_test_51J6MJ1AbQ1d1QcSG23Se76DUBjvAPDGsn9eUlRSFMPGMQwiKD3pJJJKU7JbCLfsnmQOBjccgobPdM6jXxzuPV8f600UDOxBJai'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/bookings/checkout-session/${tourId}`);
    console.log(session);
    // // 2) Create checkout form + chanre credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    alert('Error creating checkout form', err);
    console.log(err);
  }
};

// if (bookBtn)
//   bookBtn.addEventListener('click', (e) => {
//     e.target.textContent = 'Processing...';
//     const { tourId } = e.target.dataset;
//     bookTour(tourId);
//   });
