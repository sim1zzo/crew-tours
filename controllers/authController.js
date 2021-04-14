const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const { User, validate } = require('../models/user');

exports.userSignUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: 'success', data: { user } });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.logIn = async (req, res) => {
  const { error } = isValid(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid password or email');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('Invalid email or password');

  // just for test;
  res.send(true);
};

function isValid(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}
