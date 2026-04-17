const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const autho = (req, res, next) => {
//   const token = "xyzzz";
//   const isAuthoRized = token === "xyz";
//   if (!isAuthoRized) {
//     return res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

const autho = async (req, res, next) => {
  try {
    // Read the token from the request cookies
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("token is not valid");
    }

    const decodedToken = await jwt.verify(token, "82dj&&03DJ782");

    const { _id } = decodedToken;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    // console.log("Error is:", err.message);
    res.status(500).send("Something went wrong " + err.message);
  }

  // Validate the token

  // find the user
};

module.exports = {
  autho,
};
