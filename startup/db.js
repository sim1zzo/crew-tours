const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE;

module.exports = function () {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error('Could not connect to MongoDB', err.message))
};