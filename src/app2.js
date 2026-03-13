const express = require("express");

const connectDB = require("./config/database");
const app2 = express();

const User = require("./models/user");

app2.post("/signup", async (req, res) => {
  // Handle POST request for creating a new user
  const userObj = {
    firstname: "Dev",
    lastname: "Patel",
    email: "devpatel@example.com",
    password: "password123",
    age: 25,
    gender: "Male",
  };

  const user = new User(userObj);
  try {
    await user.save();
    res.send("User is successfully created");
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong");
  }
});

// We should always connect database before starting server because if we will start server before connecting database then if there is any error in connecting database then our server will be running but it will not be able to perform any database operation and it will throw error when we will try to perform any database operation. So it's always better to connect database first and then start server.
connectDB()
  .then(() => {
    console.log("Database is successfully connected");
    app2.listen(8888, () => {
      console.log("Server is successfully running");
    });
  })
  .catch((err) => {
    console.log("Error is:", err.message);
  });
