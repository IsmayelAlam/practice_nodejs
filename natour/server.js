const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("---------------------------------");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./.env.local" });

mongoose.connect(process.env.DATABASE).then((con) => {});

const port = 3000;
const server = app.listen(port, () => console.log("app running"));

process.on("unhandledRejection", (err) => {
  console.log("---------------------------------");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
