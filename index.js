const express = require('express');
const app = express();

// MIDDLEWARES
app.use(express.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on 🚪${port}`);
});