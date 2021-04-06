const express = require("express");
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Running from ${process.env.NODE_ENV}`)
}




// MIDDLEWARES
app.use(express.json());
app.use(express.static('./public'));


app.use('/api/tours', toursRouter);
// app.use('/api/users', usersRouter);

module.exports = app;
