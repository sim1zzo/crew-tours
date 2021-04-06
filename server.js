const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./index');


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port 🚪 ${port})`)
});