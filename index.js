const express = require("express");
const app = express();
const fs = require("fs");
// const mongoose = require("mongoose");

// MIDDLEWARES
app.use(express.json());

// mongoose.connect('mongodb://localhost/crew-tours', {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Cannot connect to Mongo', err.message));


const tours = JSON.parse(fs.readFileSync(`${__dirname}/development-data/tours-example.json`));


app.get('/api/tours', (req, res) => {
  res.json({
    status: 'OK',
    data: {
      tours
    }
  })
});

app.get('/api/tours/:id', (req, res) => {
  const tour = tours.find(x => x.id === parseInt(req.params.id));
  if (!tour)
    return res
      .status(404)
      .json(
        {
          status: 'Failed',
          message: "Invalid ID."
        });
  
  res.json({
    status: 'OK',
    data: {
      tour
    }
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on 🚪${port}`);
});
