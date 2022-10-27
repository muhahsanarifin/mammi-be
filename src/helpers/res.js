module.exports = {
  success: (res, status, result) => {
    res.status(status).json({
      result,
    });
  },
  error: (res, status, message) => {
    res.status(status).json({ message });
  },
};
