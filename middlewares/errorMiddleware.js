const winston = require('winston');

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).json({ staus: 'error', error: err.message });
};
