const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message:
          "Status must be either ignored, interested, accepted, or rejected",
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// connectionRequestSchema.pre("save", function (next) {
//   const connectionRequest = this;
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     new Error("You cannot send a connection request to yourself.");
//   }
//   next();
// });

// connectionRequestSchema.pre("save", async function () {
//   const connectionRequest = this;

//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("You cannot send a connection request to yourself.");
//   }
// });

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
