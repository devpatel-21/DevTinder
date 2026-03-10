// console.log("Starting a new project");

const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello Dev!");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello");
});

app.use("/test", (req, res) => {
  res.send("Hello, from server");
});

app.listen(3000, () => {
  console.log("Server is successfully running");
});
