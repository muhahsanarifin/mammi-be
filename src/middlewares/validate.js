module.exports = {
  body: (...allwoedKeys) => {
    return (req, res, next) => {
      const { body } = req;
      const sanitzedKey = Object.keys(body).filter((key) =>
        allwoedKeys.includes(key)
      );

      const newBody = {};
      for (let key of sanitzedKey) {
        Object.assign(newBody, { [key]: body[key] });
      }

      req.body = newBody;
      next();
    };
  },
};
