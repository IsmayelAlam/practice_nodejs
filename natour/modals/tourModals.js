const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name needed"],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    require: [true, "price needed"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
