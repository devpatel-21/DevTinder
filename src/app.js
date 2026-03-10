// console.log("Starting a new project");

const express = require("express");

const app = express();

// If you will http://localhost:3000/, it will show "Hello Dev!" and if you will http://localhost:3000/hello, it will show Hello Dev! and if you will http://localhost:3000/test, it will show "Hello Dev!". If you will http://localhost:3000/trrtrdtdgfd write this then it will print hello dev!

// But if you will change the order of the routes, for example if you will write app.use("/hello", (req, res) => { res.send("Hello hello"); }); before app.use("/", (req, res) => { res.send("Hello Dev!"); }); then it will show "Hello hello" when you will http://localhost:3000/hello and it will show "Hello Dev!" when you will http://localhost:3000/ and http://localhost:3000/test and http://localhost:3000/trrtrdtdgfd

// app.use("/", (req, res) => {
//   res.send("Hello Dev!");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello hello");
// });

// This will match all the routes from http method call apis to /test
// app.use("/test", (req, res) => {
//   res.send("Hello, from server");
// });

// This will only handle get call to /user
app.get("/user", (req, res) => {
  res.send({ firstname: "Dev", lastname: "Patel" });
});

app.post("/user", (req, res) => {
  // Logic to save data to database
  res.send("Data is successfully saved to database");
});

app.delete("/user", (req, res) => {
  // Logic to delete data from database
  res.send("Data is successfully deleted from database");
});

app.listen(3000, () => {
  console.log("Server is successfully running");
});
