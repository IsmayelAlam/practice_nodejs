const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (+req.params.id > tours.length - 1)
    res.status(404).json({ status: 'fail', message: 'invalid id' });

  res.status(200).json({ status: 'success', data: { tour } });
});

app.post('/api/v1/tours', (req, res) => {
  const newID = tours.length;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours[+req.params.id];
  res.status(200).json({ status: 'success', data: { tour } });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({ status: 'success', data: null });
});

const port = 3000;
app.listen(port, () => console.log('app running'));
