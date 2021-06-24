const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async function (req, res, next) {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;
      const decoded = await promisify(jwt.verify)(
        token,
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
      return next();
    }
  }

  next();
};
