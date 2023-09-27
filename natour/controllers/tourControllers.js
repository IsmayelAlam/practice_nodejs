const fs = require("fs");

const fileData = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(fileData));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    time: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (+req.params.id > tours.length - 1)
    res.status(404).json({ status: "fail", message: "invalid id" });

  res.status(200).json({ status: "success", data: { tour } });
};
exports.addNewTour = (req, res) => {
  const newID = tours.length;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(fileData, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};
exports.updateTour = (req, res) => {
  const tour = tours[+req.params.id];
  res.status(200).json({ status: "success", data: { tour } });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};
