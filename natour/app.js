const express = require("express");
const morgen = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(morgen("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "fail", message: `can't find ${req.originalUrl}` });
});

module.exports = app;
