const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";
  error.message = err.message;
  error.stack = err.stack;

  if (err.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (err.code === 11000) {
    error = handleDuplicateErrorDB(error);
  }
  if (err._message === "Validation failed") {
    error = handleValidationErrorDB(error);
  }
  if (err.name === "JsonWebTokenError") {
    error = handleTokenError(error);
  }

  sendError(error, res);
};

function sendError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    // stack: err.stack,
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
function handleTokenError() {
  const message = `Invalid token, please login again.`;

  return new AppError(message, 401);
}
