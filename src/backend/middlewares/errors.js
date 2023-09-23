const { default: AppError } = require("../utils/errClass");

module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "internal Server Error";

  if (err._message.includes("validation")) {
    // const validationErrors = Object.values(err.errors).map(
    //   (value) => value.message
    // );
    // const message = `${validationErrors.join(". ")} `;
    let message = Object.values(err.errors);
    error = new AppError(message, 400);
  }

  if (error.kind === "ObjectId") {
    const message = `product does not exist`;
    error = new AppError(message, 404);
  }

  if (err.code == 11000) {
    // const message = `Duplicate ${Object.keys(err.keyValue)} entered`;

    error = new AppError("user already exists", 400);
  }

  // throw new AppError(error.message, error.status);
  res.status(error.statusCode).json({
    success: false,
    error,
    // message: error.message,
    // stack: error.stack,
  });
};
