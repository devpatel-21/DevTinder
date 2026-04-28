const express = require("express");
const { autho } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequestSchema");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstname lastname";

userRouter.get("/user/requests/received", autho, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const allRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstname",
      "lastname",
      "age",
      "gender",
      "about",
      "photoUrl",
    ]);
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
      .select("firstname lastname age gender photoUrl about")
      .populate("fromUserId", "firstname lastname age gender photoUrl about")
      .populate("toUserId", "firstname lastname age gender photoUrl about");

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

userRouter.get("/feed", autho, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit; // Set a maximum limit of 50
    const skip = (page - 1) * limit;

    // User should see all the cards instead of
    // his connections
    // his own card
    // already sent connection request card
    // ignored people

    const loggedInUser = req.user;

    const allConnections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // //   .populate("toUserId", "firstname lastname");

    const excludeUserIds = new Set();

    // Find all connections sent + received by the logged-in user
    allConnections.forEach((connection) => {
      excludeUserIds.add(connection.fromUserId.toString());
      excludeUserIds.add(connection.toUserId.toString());
    });

    // excludeUserIds.add(loggedInUser._id.toString()); // Exclude the logged-in user

    console.log("excludeUserIds", excludeUserIds);

    const usersToShow = await User.find({
      $and: [
        { _id: { $nin: Array.from(excludeUserIds) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstname lastname age photoUrl gender about skills")
      .skip(skip)
      .limit(limit);
    res.json({ message: "Feed", data: usersToShow });

    // const LoggedInUser = req.user;

    // const allConnections = await ConnectionRequest.find({
    //   $or: [{ fromUserId: LoggedInUser._id }, { toUserId: LoggedInUser._id }],
    // })
    //   .select("fromUserId toUserId")
    //   .populate("fromUserId", "firstname lastname")
    //   .populate("toUserId", "firstname lastname");

    // // const data = allConnections.map((row) => {
    // //   if (row.fromUserId._id.toString() === LoggedInUser._id.toString()) {
    // //     return row.toUserId;
    // //   }
    // //   return row.fromUserId;
    // // });
    // res.json({ message: "Connections", data: allConnections });
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = userRouter;
