# PreMEST Code Along Express (Middlewares)

## Introduction

By following this guide, you will be able to connect and user MongoDB database instance

## Objectives

- Connect to MongoDB
- Use MongooseJS for document modeling
- Use `bcrypt` for password encryption
- Response to requests by querying from database

## Instructions

1. Continue with the project you are working on
2. In the terminal run the following one after the other

   ```bash
   npm install mongoose
   npm install dotenv
   npm install bcrypt
   npm install --save-dev cors
   ```

3. Create a file `.env` in the root of your project and append the link to your database like shown belown

   ```
   DBURL=the_url_to_your_db
   ```

4. Create a folder `models` and inside it a file `user.model.js` with the content as provided

   ```js
   // modules
   const mongoose = require("mongoose");
   const bcrypt = require("bcrypt");

   // user blueprint
   const userSchema = new mongoose.Schema({
     username: {
       type: String,
       unique: true
     },
     password: String
   });

   // encrypt password before saving new user info
   userSchema.pre("save", async function (next) {
     const salt = 10;
     this.password = await bcrypt.hash(this.password, salt);
     next();
   });

   // export user model
   const User = mongoose.model("user", userSchema);
   module.exports = User;
   ```

5. Update the code in `routes/user.js` to the following

   ```js
   const fs = require("fs");
   const { Router } = require("express");
   const router = Router();
   const { timeStamp } = require("../middlewares/users.middleware");
   const User = require("../models/user.model");

   // get all users
   router.get("/users", async function (req, res) {
     try {
       let allUsers = await User.find({});
       res.status(200).json({ success: true, body: allUsers });
     } catch (error) {
       res.status(500).json({ success: false, body: error });
     }
   });

   // get user by id
   router.get("/users/:id", async function (req, res) {
     try {
       const userId = req.params.id;

       let user = await User.findById(userId);

       res.status(200).json({ success: true, body: user });
     } catch (error) {
       res.status(400).json({ success: false, body: error });
     }
   });

   // add new user
   router.post("/users", timeStamp, async function (req, res) {
     const { username, password } = req.body;

     try {
       let user = await User.create({ username, password });

       res.status(200).json({
         success: true,
         message: "signup successful",
         body: {
           username: user.username,
           id: user._id
         }
       });
     } catch (error) {
       let message = error;

       if (error.code === 11000) {
         body = "username already exists";
       }

       res.status(400).json({ success: false, body: message });
     }
   });

   module.exports = router;
   ```

6. Finally update `index.js` file as follows

   ```js
   require("dotenv").config();
   const path = require("path");
   const express = require("express");
   const mongoose = require("mongoose");
   const cors = require("cors");

   const app = express();
   const userRoute = require("./routes/user");
   const booksRoute = require("./routes/books");

   const corsOptions = {
     origin: true,
     credentials: true,
     optionsSuccessStatus: 204
   };

   mongoose.connect(process.env.DBURL, () => {
     app.listen(4000, () => {
       console.log("SERVER UP & DATABASE CONNECTED");
     });
   });

   app.use(cors(corsOptions));
   app.use(express.json());

   app.use(userRoute);
   app.use(booksRoute);

   app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname + "/pages/index.html"));
   });

   app.get("/*", (req, res) => {
     res.status(400).sendFile(path.join(__dirname + "/pages/404.html"));
   });
   ```

## Activity

1. Create users by making a post request to `http://localhost:3000/users` with the following format

   ```js
   {
     "username": "Kri",
     "password": "p@SsWoRd"
   }
   ```

2. Get an id of a user you created and make a get request to `http://localhost:3000/users/theuserid`
3. Make a get request to `http://localhost:3000/users`
