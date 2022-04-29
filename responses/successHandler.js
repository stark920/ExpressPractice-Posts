const successHandler = (res, data) => {
  res.send({
    status: true,
    data,
  });
};

module.exports = successHandler;
