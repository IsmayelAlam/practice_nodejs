const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const feature = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .pagination();

    const docs = await feature.query;

    res.status(200).json({ status: "success", data: { docs } });
  });

exports.getOne = (model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    let docs = model.findById(req.params.id);
    if (populateOpt) docs = docs.populate(populateOpt);

    docs = await docs;

    if (!docs)
      return next(
        new AppError(`can't find any documents for: ${req.params.id}`, 404)
      );

    res.status(200).json({ status: "success", data: { docs } });
  });

exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const docs = await model.create(req.body);

    res.status(201).json({ status: "success", data: { docs } });
  });

exports.deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(
        new AppError(`can't find any document for id: ${req.params.id}`, 404)
      );

    res.status(200).json({ status: "success", data: null });
  });

exports.updateOne = (model) =>
  catchAsync(async (req, res, next) => {
    const docs = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!docs)
      return next(
        new AppError(`can't find any document for: ${req.params.id}`, 404)
      );

    res.status(200).json({ status: "success", data: { docs } });
  });
