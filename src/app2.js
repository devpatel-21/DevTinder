const express = require("express");

const connectDB = require("./config/database");
const app2 = express();

const User = require("./models/user");

app2.use(express.json());

// To create a new user
app2.post("/signup", async (req, res) => {
  // Handle POST request for creating a new user
  //   const userObj = {
  //     firstname: "Dev",
  //     lastname: "Patel",
  //     email: "devpatel@example.com",
  //     password: "password123",
  //     age: 25,
  //     gender: "Male",
  //   };
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User is successfully created");
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong");
  }
  //   console.log(req.body);
});

// To find the user by email address
app2.get("/findUser", async (req, res) => {
  // Handle GET request for fetching a user by email
  const userEmail = req.body.email;

  try {
    // This will find only one user with the given email id
    const users = await User.findOne({ email: userEmail });

    // This will find multiple users with the same email id
    // const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    console.log("Error is:", err.message);
    res.status(500).send("Something went wrong");
  }
});

// To find the all the users
app2.get("/users", async (req, res) => {
  // Handle GET request for fetching all users
  try {
    const users = await User.find();
    res.send(users);
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
