// Error handling Example

const express = require("express");

const main = express();

main.get("/getUserData", (req, res) => {
  throw new Error("This is error");
  res.send("User data sent successfully");
});

// Error handling middleware
main.use("/", (err, req, res, next) => {
  if (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong");
  }
});

main.listen(7777, () => {
  console.log("Server is successfully running");
});
