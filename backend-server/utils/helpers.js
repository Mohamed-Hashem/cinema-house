const formatUserResponse = (user) => ({
  id: user._id,
  first_name: user.first_name,
  last_name: user.last_name,
  age: user.age,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const handleError = (res, err, defaultStatus = 500) => {
  const errorHandlers = {
    ValidationError: () =>
      res.status(400).json({
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      }),
    CastError: () =>
      res.status(400).json({
        message: "Invalid data format",
      }),
  };

  const handler = errorHandlers[err.name];
  if (handler) return handler();

  res.status(defaultStatus).json({
    message: "Server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
};

module.exports = { formatUserResponse, handleError };
