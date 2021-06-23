const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const head = req.header('x-auth-token');
  const jsonwebtoken = req.cookies.jwt;
  const token = head || jsonwebtoken;

  if (!token)
    return res.status(401).json({
      status: '401 Unauthorized',
      message: 'Access denied. No token found',
    });
  try {
    const payload = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = payload;
  } catch (error) {
    return res.status(400).json({ status: 'error', message: 'Invalid token' });
  }
  next();
};
