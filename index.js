const express = require("express");
const app = express();
const mongoose = require("mongoose");

// MIDDLEWARES
app.use(express.json());

mongoose.connect('mongodb://localhost/crew-tours', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Cannot connect to Mongo', err.message));




app.get('/api/tours', (req,res) => {
  res.status(200).json({
    status: 'OK',
    data: {
      tours
    }
  })
});

app.get('/api/tours/:id', (req, res) => {
  const tour = parseInt(req.params.id);
  const tourById = tours.find(t => tour.id === tour.id);
  if (!tourById)
    return res
      .status(404)
      .json(
        {
          status: 'Failed',
          message: "Invalid ID."
        });
  
  res.status(200).json({
    status: 'OK',
    data: {
      tours
    }
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on 🚪${port}`);
});
