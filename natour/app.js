const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/', (req, res) => res.send('get from the server'));
// app.post('/', (req, res) => res.send('post data to the server'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

const port = 3000;
app.listen(port, () => console.log('app running'));
