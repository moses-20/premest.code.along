# PreMEST Code Along Express (Express Routes Part 1)

## Introduction

By following this guide, you will be able to compose a basic ExpressJS Route

## Objectives

- Display a landing page
- Display a 404 page
- Use NodeJS to read from file
- Use NodeJS to write to file

## Instructions

1. Continue with the project you worked on yesterday
2. Create a `pages` folder and `index.html` file in it. Add the following

   ```html
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Users Database Server</title>

       <style>
         * {
           padding: 0;
           margin: 0;
           box-sizing: border-box;
         }

         body {
           background-color: rgb(192, 208, 233);
           padding: 10% 5%;
         }

         main {
           max-width: 700px;
           margin: auto;
           background-color: cornflowerblue;
           box-shadow: 10px 10px 50px silver, 3px 3px 5px silver;
           color: whitesmoke;
           text-align: center;
         }

         h1 {
           font-size: 50px;
         }
       </style>
     </head>

     <body>
       <main>
         <h1>USERS' DATABASE</h1>

         <p>Design the page as you want</p>
       </main>
     </body>
   </html>
   ```

3. Again the pages folder, create `404.html` file and add the following

   ```html
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Users Database Server</title>

       <style>
         * {
           padding: 0;
           margin: 0;
           box-sizing: border-box;
         }

         body {
           background-color: rgb(192, 208, 233);
           padding: 10% 5%;
         }

         main {
           max-width: 700px;
           margin: auto;
           background-color: cornflowerblue;
           box-shadow: 10px 10px 50px silver, 3px 3px 5px silver;
           color: whitesmoke;
           text-align: center;
         }

         h1 {
           font-size: 50px;
         }
       </style>
     </head>

     <body>
       <main>
         <h1>404!</h1>
         <h2>Page not found!</h2>
       </main>
     </body>
   </html>
   ```

4. Modify your `index.js` file to look like below code

   ```js
   const path = require("path");
   const express = require("express");

   const app = express();
   const userRoute = require("./routes/user");

   app.use(express.json());

   app.use(userRoute);

   app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname + "/pages/index.html"));
   });

   app.get("/*", (req, res) => {
     res.status(400).sendFile(path.join(__dirname + "/pages/404.html"));
   });

   app.listen(4000, () => {
     console.log("SERVER IS UP!");
   });
   ```

5. In the root of your project, create a file `database.json`

   ```json
   [
     { "id": 1, "name": "Gbemu Terra" },
     { "id": 2, "name": "Yamah Knoorls" }
   ]
   ```

6. Modify `routes/users.js` to look like below code

   ```js
   const fs = require("fs");
   const { Router } = require("express");
   const router = Router();

   let users = [];

   fs.readFile("database.json", (err, data) => {
     if (err) throw err;

     users = JSON.parse(data);
   });

   router.get("/users", (req, res) => {
     res.status(200).json({ success: true, data: users });
   });

   router.get("/users/:id", (req, res) => {
     const userId = req.params.id;

     // use only two equal signs because the userId is a string but the actual id in the array is a number
     const user = users.find((u) => u.id == userId);

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

     let data = JSON.stringify(users);
     fs.writeFileSync("database.json", data);

     res.status(200).json(users);
   });

   module.exports = router;
   ```

In ther the terminal, run your app `npm start`

## Activity

1. Using Postman, make a get request to `http://localhost:4000`
2. Make a get request to `http://localhost:4000/abc`
3. Make a get request to `http://localhost:4000/users`
4. Make a get request to `http://localhost:4000/users/2`
5. Make a post request to `http://localhost:4000/users` with the following data

   ```js
   { id: 3, name: 'Kris Santos' }
   ```

6. Congrats, you are able to mimick a database by using nodejs to read and write to file 🔥🔥
