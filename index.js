const path = require('path');
const error = require('./middlewares/errorMiddleware');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cookieParser = require('cookie-parser');

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// Setting the view engine with pug.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // this is a common way to build the path, in this way we don't have to worry about if / is present or not.'
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Running from ${process.env.NODE_ENV}`);
} else if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'));
  console.log(`Running from ${process.env.NODE_ENV}`);
} else if (process.env.NODE_ENV === 'test') {
  app.use(morgan('short'));
  console.log(`Running from ${process.env.NODE_ENV}`);
}

// MIDDLEWARES
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', "script-src 'self' api.mapbox.com");
  return next();
});

app.use('/', viewRouter);
app.use('/api/tours', toursRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/bookings', bookingRouter);
app.use(error);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: '404 Not Found',
    message: `Invalid url: ${req.originalUrl}`,
  });
  next();
});

module.exports = app;
