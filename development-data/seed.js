const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-example.json`));
const { Tour } = require(`${__dirname}/../models/tour`);


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(['Could not connect to MongoDB', err.message]));

const seed = async () => {
  try {
    await Tour.deleteMany();
    await Tour.create(tours);
    console.log('Database created')
    process.exit(0);
  } catch (error) {
    console.log('Error: ' + error.message)
    process.exit(1);
  }
};

// mongoose.disconnect();

seed();






