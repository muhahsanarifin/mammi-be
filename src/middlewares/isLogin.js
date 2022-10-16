const jwt = require("jsonwebtoken");
module.exports = () => {
  return (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token)
      return res
        .status(401)
        .send({ message: "You must be login first", data: null });

    jwt.verify(
      token,
      process.env.SECRET_KEY,
      { issuer: process.env.ISSUER },
      (err, decodedPaylod) => {
        if (err) {
          console.log(err);
          return res.status(403).send({ message: err.message, data: null });
        }
        req.userPayload = decodedPaylod;
        next();
      }
    );
  };
};
