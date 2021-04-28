const dotenv = require('dotenv');
const app = require('./index');

process.on('uncaughtException', (ex) => {
  console.log('Something went wrong ❌ ', ex.name, ex.message);
  return;
});

require('./startup/log');
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port 🚪 ${port})`);
});

process.on('unhandledRejection', (ex) => {
  console.log('unhandledRejection ❌', ex.name, ex.message);
  return;
});
