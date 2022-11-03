module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const payload = req.userPayload;
    let isAllowed = false;
    for (let role of allowedRoles) {
      if (role !== payload.role) continue;
      console.log(role);
      isAllowed = true;
      break;
    }
    if (!isAllowed)
      return res.status(403).send({ message: "Forbidden", data: null });
    next();
  };
};
