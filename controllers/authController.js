const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const { User, validate } = require('../models/user');
const sendEmail = require('../utils/email');

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
    password2: req.body.password2,
    role: req.body.role,
  });

  if (user.password !== user.password2)
    return res.status(403).send('Passoword must match');

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.password2 = await bcrypt.hash(user.password2, 10);

  const token = user.generateAuthToken();
  await user.save();

  res.header('x-auth-token', token).json({
    status: 'Ok',
    data: {
      user: {
        id: user._id,
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
  console.log(validPassword);
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
function isValidPassword(passw) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(passw);
}

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '-password -password2 -__v'
  );
  res.send(user);
};

exports.forgottenPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  // generate a new token
  const token = user.generateAuthToken();
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${token}`;

  const message = `Have you forgot your password? Send a new request with your new password to ${url}`;
  await sendEmail({
    email: req.body.email,
    subject: 'Reset password',
    message,
  });
  res.status(200).send('Email send!');
};

exports.resetPassword = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('No user with such email address');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const valid = isValidPassword(password);
  if (!valid) return res.status(400).send('Invalid password');

  user.password = password;
  await user.save();
  res.status(200).json({
    status: 'OK',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

exports.changeRole = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('No user found');

  if (!req.body.role)
    return res
      .status(404)
      .send('To assign a new role for a user a role has to be specified');
  user.role = req.body.role;
  await user.save();
  res.status(200).json({
    status: 'OK',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
