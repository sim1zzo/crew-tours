module.exports = function (err, req, res, next) {
  res.status(500).json({ staus: 'error', error: err.message });
};
