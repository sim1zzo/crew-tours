const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
      userNumber: users.length,
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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuthToken();
    await user.save();

    res.header('x-auth-token', token).json({
      status: 'Ok',
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  });

exports.getUser = async (req, res) => {
  let user = await User.findById(req.params.id).select('-__v');
  if (!user)
    return res.status(404).json({ status: 'Error', message: error.message });
  try {
    return res.status(200).json({
      status: 'OK',
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ status: 'Error', message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 'Deleted', user });
  } catch (error) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }
};

exports.updateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 'Failed', messagge: error.details[0].message });
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res.status(200).json({
      status: 'Updated',
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(404).json({ status: 'Error', message: error.message });
  }
};
