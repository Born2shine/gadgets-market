module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "internal Server Error";

  if (err?._message?.includes("validation")) {
    const validationErrors = Object?.values(err.errors).map(
      (value) => value.message
    );
    const message = `${validationErrors.join(". ")} `;
    return res.status(400).json({ message });
  }

  if (error?.kind === "ObjectId") {
    const message = `product does not exist`;
    return res.status(404).json({ message });
  }

  if (err?.code == 11000) {
    const type = err?.message.includes("email");
    const message = type ? "user already exists" : "product already exists";
    return res.status(400).json({ message });
  }
  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
