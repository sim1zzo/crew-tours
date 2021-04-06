const morgan = require('morgan');
const express = require("express");
const toursRouter = require('./routes/toursRoutes');
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/tours', toursRouter);




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on 🚪${port}`);
});
