const express = require('express');
const morgan = require('morgan');
const ErrorHandling = require('./utils/errorHandling');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
const errorHandlerMiddle = require('./middlewares/errorMiddleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Running from ${process.env.NODE_ENV}`);
}

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api/tours', toursRouter);
// app.use('/api/users', usersRouter);

app.all('*', (req, res, next) => {
  next(
    new ErrorHandling(
      `Unable to connect to the given URL: ${req.originalUrl}`,
      404
    )
  );
});
// Error handling middleware
app.use(errorHandlerMiddle);

module.exports = app;
