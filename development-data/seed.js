const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-example.json`));
const { Tour } = require(`${__dirname}/../models/tour`);


require('../startup/db')();

const seed = async () => {
  try {
    await Tour.deleteMany();
    await Tour.create(tours);
    console.log('Database populated')
  } catch (error) {
    console.log('Error: ' + error.message)
  }
  process.exit();
};

// mongoose.disconnect();

seed();






