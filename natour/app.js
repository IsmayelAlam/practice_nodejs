const express = require("express");
const morgen = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();

app.use(morgen("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(`can't find ${req.originalUrl}`, 404);
  next(err);
});

app.use(errorController);

module.exports = app;
