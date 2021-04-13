require('express-async-errors');
const { User, validate } = require('../models/user');

exports.getAllUsers =
  ('/',
  async (req, res) => {
    const users = await User.find().sort('name -price ').select('-__v');
    if (!users)
      return res.json({
        status: 404,
        message: 'Invalid request',
      });
    res.status(200).json({
      status: 'Ok',
      data: {
        users,
      },
    });
  });

exports.createUser =
  ('/',
  async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: 'Failed', messagge: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = await User.create(req.body);
    res.status(200).json({
      status: 'Ok',
      data: {
        user,
      },
    });
  });

exports.getUser = async (req, res) => {
  let user = await User.findById(req.params.id).select('-__v');
  if (!user)
    return res.status(404).json({ status: 'Error', message: error.message });

  return res.status(200).json({
    status: 'OK',
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
};
