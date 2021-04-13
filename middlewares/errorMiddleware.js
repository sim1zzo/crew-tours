module.exports = (err, req, res, next) => {
  // get the error status first then pass it to the status;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
};
