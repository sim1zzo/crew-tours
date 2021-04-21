const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log(token);
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

// module.exports = function (req, res, next) {
//   const authHeader = req.headers['x-auth-token'];
//   const token = authHeader && authHeader.split(' ')[0]; // token or undefined
//   if (!token)
//     return res.status(401).json({ status: 'error', message: 'Invalid token' });

//   jwt.verify(token, process.env.jwtPrivateKey, (err, user) => {
//     if (err) return res.status(403).send(err.message);
//     req.user = user;
//   });
//   next();
// };
