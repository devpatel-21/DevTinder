const express = require("express");
const { autho } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/Profile/view", autho, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong " + err.message);
  }
});

profileRouter.patch("/Profile/edit", autho, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Invalid fields in request body");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    // console.log("User is:", user);
    res.json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

module.exports = profileRouter;
