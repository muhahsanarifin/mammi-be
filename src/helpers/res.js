module.exports = {
  success: (res, status, result) => {
    res.status(status).send({
      result,
    });
  },
  error: (res, status, message) => {
    res.status(status).send({ message });
  },
};
