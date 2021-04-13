const express = require('express');
const morgan = require('morgan');
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
  res.status(404).json({
    status: '404 Not Found',
    message: `Invalid url: ${req.originalUrl}`,
  });

  next();
});
// Error handling middleware
app.use(errorHandlerMiddle);

module.exports = app;
