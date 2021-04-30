const { Review, validate } = require('../models/review');
const jwt = require('jsonwebtoken');

exports.getOneOrAllReviews = async (req, res) => {
  // Searching if it has a tour id
  let search = {};
  // if has a tour id, search object will be populated with such tour
  if (req.params.id) search = { tour: req.params.id };
  // if search obj is an empty object all reviews will be retrieved otherwise only those for that specific tourid
  const review = await Review.find(search);
  if (!review) return res.status(404).send('No review found');
  return res.status(200).json({
    status: 'ok',
    quatity: review.length,
    data: {
      review,
    },
  });
};

exports.createReview = async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  if (!req.body.tour) {
    req.body.tour = req.params.id;
    console.log(req.body.tour);
  }
  if (!req.body.user) {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    const userId = decoded._id;
    req.body.user = userId;
    console.log(req.body.user);
  }

  const review = await Review.create(req.body);

  return res.status(200).json({
    status: 'Created',
    data: {
      review,
    },
  });
};

exports.updateReview = async (req, res) => {
  const update = req.body;
  const review = await Review.findOneAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: 'Updated',
    data: { review },
  });
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: 'Deleted', review });
};
