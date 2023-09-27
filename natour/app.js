const express = require('express');
const fs = require('fs');
const morgen = require('morgan');

const app = express();

app.use(morgen('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    results: tours.length,
    data: { tours },
  });
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

function getAllUsers(req, res) {}
function addNewUsers(req, res) {}
function getUsers(req, res) {}
function updateUsers(req, res) {}
function deleteUsers(req, res) {}

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(addNewUsers);
app
  .route('/api/v1/users/:id')
  .get(getUsers)
  .patch(updateUsers)
  .delete(deleteUsers);

const port = 3000;
app.listen(port, () => console.log('app running'));
