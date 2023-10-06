const Tour = require("../modals/tourModals");

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: "success" });
};
exports.getTour = (req, res) => {
  res.status(200).json({ status: "success", data: {} });
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ status: "success", data: { tours: newTour } });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
exports.updateTour = (req, res) => {
  res.status(200).json({ status: "success", data: {} });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};
