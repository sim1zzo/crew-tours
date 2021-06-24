const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async function (req, res, next) {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.jwtPrivateKey
      );
      // console.log(decoded);
      const user = await User.findById(decoded._id);
      if (!user) {
        conole.log('No user 🤷‍♂️');
        return next();
      }
      // console.log('User:' + user);
      res.locals.user = user;
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid token' });
    }
  }

  next();
};
