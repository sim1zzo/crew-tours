/*
The goal of this middleware is to display different messages
based on the environment we are at.
Displaying a comprehensive list of information if in development
and a less descriptive message if in production.
*/

const productionError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  // get the error status first then pass it to the status;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return process.env.NODE_ENV === 'development'
    ? developmentError(err, res)
    : productionError(err, res);
};
