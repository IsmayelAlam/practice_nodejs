const Tour = require("../modals/tourModals");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ status: "success", data: { tours } });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({ status: "success", data: { tours } });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ status: "success", data: { tours: newTour } });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", data: { tours } });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tours = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
