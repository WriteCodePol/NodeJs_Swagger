const express = require('express');
const swaggerSetup = require('./swagger');


const app = express();
const port = 3000;

swaggerSetup(app);


// Sample route ddd
app.get('/', (req, res) => {
  res.send('Hello World!'+req.ip);
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
