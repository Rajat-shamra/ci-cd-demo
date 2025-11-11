const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Jenkins CI/CD Demo v2');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

