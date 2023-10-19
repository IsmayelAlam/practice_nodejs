const mongoose = require("mongoose");
const Tour = require("./tourModels");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: { type: Date, default: Date.now },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        required: [true, "Review must have a tour"],
      },
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Review must have a user"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.static.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0)
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0]?.avgRating,
      ratingsQuantity: stats[0]?.nRating,
    });
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});
reviewSchema.pre(/^findByIdAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tour);
});
reviewSchema.post(/^findByIdAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
