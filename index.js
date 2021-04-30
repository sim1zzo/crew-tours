const error = require('./middlewares/errorMiddleware');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Running from ${process.env.NODE_ENV}`);
}

// MIDDLEWARES
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api/tours', toursRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use(error);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: '404 Not Found',
    message: `Invalid url: ${req.originalUrl}`,
  });
  next();
});

module.exports = app;
