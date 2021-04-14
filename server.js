const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');

// connecting to the database
require('./startup/db')();

if (!process.env.jwtPrivateKey) {
  console.log('FARAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port 🚪 ${port})`);
});
