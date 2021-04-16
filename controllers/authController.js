const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const { User, validate } = require('../models/user');
const dotenv = require('dotenv');

exports.userSignUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 'Failed', messagge: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
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
        role: user.role,
      },
    },
  });
};

exports.logIn = async (req, res) => {
  const { error } = isValid(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //sending non specific error message for security reason
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid password or email');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('Invalid email or password');

  //  Information Exper Principle all the information about token are handled by user
  const token = user.generateAuthToken();
  res.send(token);
};

function isValid(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  res.send(user);
};
