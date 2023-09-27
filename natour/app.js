const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

function getAllTours(req, res) {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
}
function getTour(req, res) {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (+req.params.id > tours.length - 1)
    res.status(404).json({ status: 'fail', message: 'invalid id' });

  res.status(200).json({ status: 'success', data: { tour } });
}
function addNewTour(req, res) {
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
}
function updateTour(req, res) {
  const tour = tours[+req.params.id];
  res.status(200).json({ status: 'success', data: { tour } });
}
function deleteTour(req, res) {
  res.status(204).json({ status: 'success', data: null });
}

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => console.log('app running'));
