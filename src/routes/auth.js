const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

// To create a new user
authRouter.post("/signup", async (req, res) => {
  // Handle POST request for creating a new user
  //   const userObj = {
  //     firstname: "Dev",
  //     lastname: "Patel",
  //     email: "devpatel@example.com",
  //     password: "password123",
  //     age: 25,
  //     gender: "Male",
  //   };
  try {
    validateSignUpData(req);

    const { firstname, lastname, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User is successfully created");
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong " + err.message);
  }
  //   console.log(req.body);
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await user.ValidatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = await user.getJWT();
    console.log(token);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie to expire in 1 day
      httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
    });
    res.send("Login successful");
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful");
});

module.exports = authRouter;
