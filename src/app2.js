const express = require("express");

const connectDB = require("./config/database");
const app2 = express();

const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("./utils/validation");
const { autho } = require("./middlewares/auth");

app2.use(express.json());
app2.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app2.use("/", authRouter);
app2.use("/", profileRouter);
app2.use("/", requestRouter);
app2.use("/", userRouter);

// To create a new user
// app2.post("/signup", async (req, res) => {
//   // Handle POST request for creating a new user
//   //   const userObj = {
//   //     firstname: "Dev",
//   //     lastname: "Patel",
//   //     email: "devpatel@example.com",
//   //     password: "password123",
//   //     age: 25,
//   //     gender: "Male",
//   //   };
//   try {
//     validateSignUpData(req);

//     const { firstname, lastname, email, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const user = new User({
//       firstname,
//       lastname,
//       email,
//       password: passwordHash,
//     });

//     await user.save();
//     res.send("User is successfully created");
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong " + err.message);
//   }
//   //   console.log(req.body);
// });

// app2.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     const isPasswordValid = await user.ValidatePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).send("Invalid credentials");
//     }

//     const token = await user.getJWT();
//     console.log(token);

//     res.cookie("token", token, {
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie to expire in 1 day
//       httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
//     });
//     res.send("Login successful");
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong " + err.message);
//   }
// });

// app2.get("/Profile", async (req, res) => {
//   const cookies = req.cookies;

//   console.log(cookies);
// });

// app2.get("/Profile", autho, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user);
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong " + err.message);
//   }
// });

// To find the user by email address
// app2.get("/findUser", async (req, res) => {
//   // Handle GET request for fetching a user by email
//   const userEmail = req.body.email;

//   try {
//     // This will find only one user with the given email id
//     const users = await User.findOne({ email: userEmail });

//     // This will find multiple users with the same email id
//     // const users = await User.find({ email: userEmail });
//     if (users.length === 0) {
//       return res.status(404).send("User not found");
//     }
//     res.send(users);
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong");
//   }
// });

// To find the all the users
// app2.get("/users", async (req, res) => {
//   // Handle GET request for fetching all users
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong");
//   }
// });

// To delete the user by id
// app2.delete("/deleteUser", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     // We can delete the user by both this way
//     const user = await User.findByIdAndDelete({ _id: userId });
//     // const user = await User.findByIdAndDelete(userId);
//     res.send("User is successfully deleted");
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong");
//   }
// });

//To update the user
// app2.patch("/updateUser", async (req, res) => {
//   const userId = req.body.userId;
//   //   const updateData = req.body.updateData;
//   const data = req.body;

//   try {
//     const allowedUpdates = [
//       "firstname",
//       "lastname",
//       "password",
//       "hobbies",
//       "skills",
//       "userId",
//     ];

//     const isUpdateAllowed = Object.keys(data).every((key) =>
//       allowedUpdates.includes(key),
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Invalid updates");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be greater then 10");
//     }
//     // by default it will print old data
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       runValidators: true,
//     });

//     // It will print the updated user data
//     // const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//     //   returnDocument: "after",
//     // });
//     console.log(user);
//     res.send("User is successfully updated");
//   } catch (err) {
//     console.log("Error is:", err.message);
//     res.status(500).send("Something went wrong");
//   }
// });

// app2.post("/sendConnectionRequest", autho, async (req, res) => {
//   const user = req.user;
//   console.log("Send connection request API is called");

//   res.send(user.firstname + " send the Connection request.");
// });

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
