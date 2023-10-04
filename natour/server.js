const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env.local" });

mongoose.connect(process.env.DATABASE).then((con) => {
  console.log("connected");
});

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

const port = 3000;
app.listen(port, () => console.log("app running"));
