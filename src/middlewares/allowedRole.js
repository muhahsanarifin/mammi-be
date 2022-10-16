module.exports = (...allowedeRole) => {
  return (req, res, next) => {
    const payload = re.userPayload;
    let isAllowed = false;
    for (let role of allowedeRole) {
      if (role !== payload.role) continue;
      isAllowed = true;
      break;
    }
    if (!isAllowed)
      return res.status(403).send({ message: "Forbidden", data: null });
  };
};
