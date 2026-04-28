const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname) {
    throw new Error("Name is not valid");
  }
  //   else if (firstname.length < 3 || firstname.length > 50) {
  //     throw new Error("First name must be between 3 and 50 characters");
  //   }
  else if (!email || !validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateEditProfileData = (req) => {
  const allowEditFields = [
    "firstname",
    "lastname",
    "about",
    "skills",
    "age",
    "gender",
    "photoUrl",
  ];

  const isAllowEdit = Object.keys(req.body).every((key) =>
    allowEditFields.includes(key),
  );

  return isAllowEdit;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
