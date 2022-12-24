module.exports = {
  success: (res, status, result) => {
    res.status(status).json({
      result,
    });
  },
  error: (res, status, result) => {
    res.status(status).json({ result });
  },
};
