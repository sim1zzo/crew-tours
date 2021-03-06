const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: [true, 'Every user must have a name'],
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: 'String',
    required: [true, 'Every tour has to have an email'],
    trim: true,
    lowercase: true,
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
  password2: {
    type: 'String',
    // required: [true, 'Every user must have a password confirmation'],
    ref: 'password',
    // minlength: 5,
    // maxlength: 1024,
  },
  avatar: {
    type: 'String',
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    default: 'user',
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    avatar: Joi.string(),
    password: Joi.string().required().min(5).max(255),
    password2: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('password2')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
