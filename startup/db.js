const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
let DB = process.env.DATABASE;

if (process.env.NODE_ENV === 'test') DB = process.env.DATABASE_TEST;

module.exports = function () {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to MongoDB, ${process.env.NODE_ENV}...`))
    .catch((err) => console.error('Could not connect to MongoDB', err.message));
};
