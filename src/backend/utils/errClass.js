class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

// const { default: AppError } = require("../utils/errClass");

// // const handleDuplicateError = (err) => {
// //   const message = Object.keys(err.KeyValue);
// //   return new AppError(`duplicate key error: ${message} `, 400);
// // };

// // const handleObjectIdErrorDB = (err) => {
// //   const message = `product does not exist`;
// //   return new AppError(message, 404);
// // };

// // const handleValidationError = (err) => {
// //   const validationErrors = Object.values(err.errors).map((val) => val.message);
// //   const message = `${validationErrors.join(". ")} `;
// //   return new AppError(message, 404);
// // };

// const handleErrorProd = (err, res) => {
//   console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrrr");
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//       stack: err.stack,
//     });
//   } else {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: "SOMETHING WENT WRONG",
//     });
//     console.log("ERROR", err);
//   }
// };

// module.exports = (err, req, res, next) => {
//   let error = { ...err };
//   error.statusCode = error.statusCode || 500;
//   error.message = err.message || "Internal Server Error ";

//   // if (error._message === "User validation failed") {
//   //   console.log(error, "validationnnnnnnnnnn");
//   //   error = handleValidationError(error);
//   // }
//   // if (error.kind === "ObjectId") {
//   //   error = handleObjectIdErrorDB(error);
//   // }

//   // if (error.code === 11000) {
//   //   error = handleDuplicateError(error);
//   // }

//   handleErrorProd(error, res);
// };
