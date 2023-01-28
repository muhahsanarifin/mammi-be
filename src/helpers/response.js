module.exports = {
  success: (res, status, result, msg) => {
    res.status(status).json({
      result,
      msg: msg,
    });
  },
  error: (res, status, result) => {
    res.status(status).json({ result });
  },
};
