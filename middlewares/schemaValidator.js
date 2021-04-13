exports.isValidTour = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid tour name or tour price',
    });
  }
  next();
};

exports.isValidUser = (req, res, next) => {
  if (!req.body.name || !req.body.password) {
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid user name or password',
    });
  }
  next();
};
