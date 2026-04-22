const express = require("express");
const { autho } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestSchema");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstname lastname";

userRouter.get("/user/requests/received", autho, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const allRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstname", "lastname"]);
    res.json({ message: "Connection requests received", data: allRequests });
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(400).send("Something went wrong " + err.message);
  }
});

userRouter.get("/user/connections", autho, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    const allConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: LoggedInUser._id, status: "accepted" },
        { toUserId: LoggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = allConnections.map((row) => {
      if (row.fromUserId._id.toString() === LoggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ message: "Connections", data: data });
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = userRouter;
