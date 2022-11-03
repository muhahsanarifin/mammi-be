let JWTR = require("jwt-redis").default;
const client = require("../config/redis");
const jwtr = new JWTR(client);
module.exports = () => {
  return (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token)
      return res
        .status(401)
        .send({ message: "You have to login first", data: null });

    jwtr
      .verify(token, process.env.SECRET_KEY, { issuer: process.env.ISSUER })
      .then((decodePayload) => {
        req.userPayload = decodePayload;
        next();
      })
      .catch((err) => {
        return res
          .status(401)
          .json({ message: "You have to login first, data: null" });
      });
  };
};
