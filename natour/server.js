const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env.local" });

mongoose.connect(process.env.DATABASE).then((con) => {});

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

const Tour = mongoose.model("Tours", tourSchema);

const testTour = new Tour({
  name: "test 01",
  rating: 4.7,
  price: 499,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));

const port = 3000;
app.listen(port, () => console.log("app running"));
