const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: 'String',
    required: [true, 'Every user must have a name'],
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: 'String',
    required: [true, 'Every tour has to have an email'],
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: 'String',
    required: [true, 'Every user must have a password'],
    minlength: 5,
    maxlength: 1024,
  },
  avatar: 'String',
});

mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;