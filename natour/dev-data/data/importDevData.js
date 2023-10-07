const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Tour = require("../../modals/tourModals");

dotenv.config({ path: "./.env.local" });

mongoose.connect(process.env.DATABASE).then((con) => {
  console.log("done");
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

async function importData() {
  try {
    await Tour.create(tours);
    console.log("imported data");
    process.exit();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}
async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log("deleted data");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}

process.argv[2] === "--import" ? importData() : deleteData();
