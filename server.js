const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./index');

const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error('Could not connect to MongoDB', err.message));


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port 🚪 ${port})`)
});