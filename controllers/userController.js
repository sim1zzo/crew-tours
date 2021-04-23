const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

exports.getAllUsers = async (req, res) => {
  const users = await User.find()
    .sort('name')
    .select('-__v -password -password2');
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
};

exports.getUser = async (req, res) => {
  let user = await User.findById(req.params.id).select('-__v');
  if (!user)
    return res.status(404).json({ status: 'Error', message: error.message });

  return res.status(200).json({
    status: 'OK',
    data: { id: user.id, name: user.name, email: user.email },
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: 'Deleted', user });
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('No user found');

  const uneededFields = ['password', 'role'];

  if (uneededFields.some((x) => x in req.body))
    return res
      .status(400)
      .send(
        'Cannot update password or role. Please use a proper path! api/users/resetPassword or api/users/changeRole'
      );

  if (req.body.name) {
    user.name = req.body.name;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

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
};

// exports.createUser = async (req, res) => {
//   const { error } = validate(req.body);
//   if (error)
//     return res
//       .status(400)
//       .json({ status: 'Failed', messagge: error.details[0].message });

//   let user = await User.findOne({ email: req.body.email });
//   // console.log(req.body.email);
//   if (user) return res.status(400).send('User already registered');

//   user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   const token = user.generateAuthToken();
//   await user.save();

//   res.header('x-auth-token', token).json({
//     status: 'Ok',
//     data: {
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token,
//       },
//     },
//   });
// };
