const dotenv = require('dotenv');
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-example.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

const { Tour } = require(`${__dirname}/../models/tour`);
const { Review } = require(`${__dirname}/../models/review`);
const { User } = require(`${__dirname}/../models/user`);

require('../startup/db')();

const seed = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users);

    console.log('Database populated');
  } catch (error) {
    console.log('Error: ' + error.message);
  }
  process.exit();
};

seed();
