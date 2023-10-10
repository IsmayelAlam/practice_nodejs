const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour needs name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour needs duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour needs max group size"],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour needs price"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour needs difficulty"],
  },
  discount: {
    type: Number,
    validate: function (val) {
      return val < this.price;
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour needs summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour needs cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// doc middleware
tourSchema.pre("save", function (next) {
  console.log("pre");
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
