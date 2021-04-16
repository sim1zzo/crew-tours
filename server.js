const dotenv = require('dotenv');
const app = require('./index');

require('./startup/log');
// connecting to the database
require('./startup/db')();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port 🚪 ${port})`);
});
