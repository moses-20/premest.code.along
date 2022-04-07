# PreMEST Code Along Express (Express Routes Part 1)

## Introduction

By following this guide, you will be able to compose a basic ExpressJS Route

## Objectives

- Create a simple express server
- Handle `get` requests
- Respond to query parameters
- Respond to `post` requests

## Instructions

1. Create a project folder and open with VS Code
2. In the terminal, run `npm init -y`
3. Run `npm install express`
4. Finally `npm install --dev nodemon`
5. In the `package.json` file, add a script

   ```js
    // ... other configs
    "scripts: {
      "start": "nodemon index.js"
      "test": "..."
    }

   ```

6. Create a file `index.js` and add the following

   ```js
   const express = require("express");

   const app = express();
   const userRoute = require("./routes/users");

   app.use(express.json());

   app.use(userRoute);

   app.get("/", (req, res) => {
     res.status(200).send("<h1>WELCOME TO THE USERS' DATABASE</h1>");
   });

   app.get("/*", (req, res) => {
     res.status(200).send("<h1>PAGE NOT FOUND!</h1>");
   });

   app.listen(4000, () => {
     console.log("SERVER IS UP!");
   });
   ```

7. Create a folder `routes` and inside it, a file `users.js`

   ```js
   const { Router } = require("express");
   const router = Router();

   const users = [
     { id: 1, name: "Gbemu Terra" },
     { id: 2, name: "Yamah Knoorls" }
   ];

   router.get("/users", (req, res) => {
     res.status(200).json({ success: true, data: users });
   });

   router.get("/users/:id", (req, res) => {
     const userId = req.params.id;
     const user = users.find((u) => u.id == userId); // use only two equal signs because the userId is a string but the actual id in the array is a number

     if (!user) {
       return res
         .status(400)
         .json({ success: false, message: "user not found" });
     }

     res.status(200).json({ success: true, data: user });
   });

   router.post("/users", (req, res) => {
     const newUser = req.body;
     users.push(newUser);

     res.status(200).json(users);
   });

   module.exports = router;
   ```

8. In ther the terminal, run your app `npm start`

## Activity

1. Using Postman, make a get request to `http://localhost:4000`
2. Make a get request to `http://localhost:4000/abc`
3. Make a get request to `http://localhost:4000/users`
4. Make a get request to `http://localhost:4000/users/2`
5. Make a post request to `http://localhost:4000/users` with the following data

   ```js
   {id:3, name: 'Kris Santos'}
   ```

6. Enjoy your journey towards fullstack development ✌️
