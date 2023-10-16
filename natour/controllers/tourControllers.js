const Tour = require("../models/tourModels");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const feature = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();

  const tours = await feature.query;

  res.status(200).json({ status: "success", data: { tours } });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.findById(req.params.id);

  if (!tours)
    return next(
      new AppError(`can't find any tours for: ${req.params.id}`, 404)
    );

  res.status(200).json({ status: "success", data: { tours } });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({ status: "success", data: { tours: newTour } });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tours)
    return next(
      new AppError(`can't find any tours for: ${req.params.id}`, 404)
    );

  res.status(200).json({ status: "success", data: { tours } });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.findByIdAndDelete(req.params.id);
  if (!tours)
    return next(
      new AppError(`can't find any tours for: ${req.params.id}`, 404)
    );
  res.status(200).json({ status: "success", data: null });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$ratingsAverage" },
        numRating: { $sum: "$ratingsQuantity" },
        numTours: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({ status: "success", data: { stats } });
});

exports.getMonthlyPlans = catchAsync(async (req, res, next) => {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        tourName: { $push: "$name" },
        numTours: { $sum: 1 },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numTours: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({ status: "success", data: { plan } });
});
