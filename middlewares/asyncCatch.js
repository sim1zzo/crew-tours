module.exports = function (fx) {
  return async (req, res, next) => {
    try {
      fx(req, res);
    } catch (error) {
      next(error);
    }
  };
};
