const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  if (err.name === "CastError") {
    error = handleCastErrorDB(error);
  } else if (err.code === 11000) {
    error = handleDuplicateErrorDB(error);
  } else if (err._message === "Validation failed") {
    error = handleValidationErrorDB(error);
  }

  sendError(error, res);
};

function sendError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
}
function handleDuplicateErrorDB(err) {
  const message = `Duplicate field value: ${err.keyValue.name}`;

  return new AppError(message, 400);
}
function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input: ${errors.join(" ")}`;

  return new AppError(message, 400);
}
