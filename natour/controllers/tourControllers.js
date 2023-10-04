const fs = require("fs");
const Tour = require("../modals/tourModals");

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: "success" });
};
exports.getTour = (req, res) => {
  res.status(200).json({ status: "success", data: { tour } });
};
exports.addNewTour = (req, res) => {
  res.status(201).json({ status: "success" });
};
exports.updateTour = (req, res) => {
  res.status(200).json({ status: "success", data: { tour } });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};
