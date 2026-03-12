const autho = (req, res, next) => {
  const token = "xyzzz";
  const isAuthoRized = token === "xyz";
  if (!isAuthoRized) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  autho,
};
