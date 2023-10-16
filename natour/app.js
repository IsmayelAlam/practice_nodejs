const express = require("express");
const morgen = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const tourRoutes = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();
app.use(helmet());

// app.use(morgen("dev"));

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 100,
  message: "Too many request from same IP",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(`can't find ${req.originalUrl}`, 404);
  next(err);
});

app.use(errorController);

module.exports = app;
