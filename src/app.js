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

// This is the example of how to handle different http method call
// // This will only handle get call to /user
// app.get("/user", (req, res) => {
//   res.send({ firstname: "Dev", lastname: "Patel" });
// });

// app.post("/user", (req, res) => {
//   // Logic to save data to database
//   res.send("Data is successfully saved to database");
// });

// app.delete("/user", (req, res) => {
//   // Logic to delete data from database
//   res.send("Data is successfully deleted from database");
// });

// If we will use 'use' instead of 'get' This will match all the routes from http get method call like /abc, /abc/test, /abc/test/hello, /abc/test/hello/world
app.get("/abc/:abcId/:name/:pass", (req, res) => {
  console.log(req.query);
  // http://localhost:3000/abc?user=10&name='dev'
  console.log(req.params);
  // http://localhost:3000/abc/110/dev/fdsa
  res.send("This is abc route");
});

// app.get("/ab+c", (req, res) => {
//   res.send("This is abc route");
// });

// This is the example of how to use multiple callback function in a single route
// In below code client will get response from first callback function we have written next() in first callback function so it will move to second callback function and print "This is second callback function" in console and it will throw error because we have already send response to client in first callback function and we can't send response again to client in second callback function. If you will remove res.send("This is second callback function"); from second callback function then it will work fine and it will print "This is second callback function" in console.
// app.get(
//   "/test",
//   (req, res, next) => {
//     res.send("This is test route");
//     next();
//   },
//   (req, res) => {
//     console.log("This is second callback function");
//     res.send("This is second callback function");
//   },
// );

// This will work same as above
// app.get("/test", (req, res, next) => {
//   console.log("This is first callback function");
//   next();
// });

// app.get("/test", (req, res, next) => {
//   console.log("This is second callback function");
//   res.send("This is second callback function");
// });

// This will print "This is first callback function" in console and then it will move to second callback function and print "This is second callback function" in console but it will throw error because we have use next() in second callback function and there is not any callback function after second callback function.
app.get(
  "/test",
  (req, res, next) => {
    console.log("This is first callback function");
    next();
  },
  (req, res, next) => {
    console.log("This is second callback function");
    next();
  },
);

app.listen(3000, () => {
  console.log("Server is successfully running");
});
