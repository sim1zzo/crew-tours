const multer = require('multer');
const sharp = require('sharp');
const { User, validate } = require('../models/user');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().sort('name').select('-__v -password');
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
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: 'Deleted', user });
};

exports.getAllGuides = async (req, res) => {
  const guides = await User.find({ role: 'guide' });
  return res.status(200).json({
    status: 'OK',
    data: {
      guides,
    },
  });
};

const storage = multer.memoryStorage();

const upload = multer({
  storate: storage,
});

exports.uploadUserPhoto = upload.single('avatar');

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);
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
  if (req.file) {
    req.file.filename = `avatar-${req.user._id}-${Date.now()}.jpeg`;
    // console.log(req.file);
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/users/${req.file.filename}`);
    user.avatar = req.file.filename;
  }

  await user.save();
  // 2) Filtered out unwanted fields names that are not allowed to be updated

  return res.status(200).json({
    status: 'Updated',
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
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
