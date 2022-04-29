const errorHandler = (res, message, errorCode = 400) => {
  res.status(errorCode).send({
    status: false,
    message,
  });
};

module.exports = errorHandler;
