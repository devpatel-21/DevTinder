const express = require("express");
const { autho } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequestSchema");
const User = require("../models/user");

// requestRouter.post("/sendConnectionRequest", autho, async (req, res) => {
//   const user = req.user;
//   console.log("Send connection request API is called");

//   res.send(user.firstname + " send the Connection request.");
// });

requestRouter.post(
  "/request/send/:status/:toUserId",
  autho,
  async (req, res) => {
    // console.log("Send connection request API is called");
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;

      const status = req.params.status;

      const allowedStatuses = ["ignored", "interested"];

      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .send("Invalid status. Status must be either ignored or interested.");
      }

      const isSameUser = fromUserId.equals(toUserId);
      if (isSameUser) {
        return res
          .status(400)
          .send("You cannot send a connection request to yourself.");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(404)
          .send("The user you are trying to connect with does not exist.");
      }

      // Check if a connection request already exists between the two users
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        return res
          .status(400)
          .send("A connection request already exists between these users.");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully.",
        data,
      });
      // res.send("Connection request sent successfully.");
    } catch (err) {
      console.log("Error sending connection request:", err.message);
      res.status(400).send("Error is : " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  autho,
  async (req, res) => {
    try {
      // loggedInuser should be the toUserId in the connection request
      // Status should be the interested

      // Validate the status parameter
      const status = req.params.status;
      const connectionRequestId = req.params.requestId;
      const loggedInUser = req.user;
      const allowedStatuses = ["accepted", "rejected"];

      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .send("Invalid status. Status must be either accepted or rejected.");
      }

      const connectionRequest = await ConnectionRequest.findById({
        _id: connectionRequestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).send("Connection request not found.");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request " + status + " successfully.",
        data,
      });
    } catch (err) {
      console.log("Error reviewing connection request:", err.message);
      res.status(400).send("Error is : " + err.message);
    }
  },
);

module.exports = requestRouter;
