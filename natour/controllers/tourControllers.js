const Tour = require("../modals/tourModals");

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryStr));
    console.log(req.query.sort);

    if (req.query.sort)
      query = query.sort(
        req.query.sort.includes(",")
          ? req.query.sort.split(",").join(" ")
          : req.query.sort
      );

    const tours = await query;
    res
      .status(200)
      .json({ status: "success", results: tours.length, data: { tours } });
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
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", data: { message: error } });
  }
};
