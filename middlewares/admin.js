module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ status: '403 Forbidden', message: 'Access denied!' });
  next();
};
