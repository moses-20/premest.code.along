# PreMEST Code Along Express (Middlewares)

## Introduction

By following this guide, you will be able to create and use custom Express middlewares

## Objectives

- Create auth checker middleware
- Create activity logger middleware
- Parse route query parameters
- Use express `next()` method

## Instructions

1. Continue with the project you are working on
2. In the `pages` folder, create `no-auth.html` file in it. Add the following

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
         <h1>401!</h1>
         <h2>You need to be authenticated!</h2>
       </main>
     </body>
   </html>
   ```

3. In the root directory of your project, create a `middlewares` folder, make a file `users.middleware.js` and add the following in it

   ```js
   const path = require("path");
   const fs = require("fs");

   const userMiddlewares = {};

   const AuthStatus = {
     TRUE: "true"
   };

   userMiddlewares.checkAuth = (req, res, next) => {
     const auth = req.query.auth;

     if (auth === AuthStatus.TRUE) {
       return next();
     }

     return res
       .status(401)
       .sendFile(path.join(__dirname + "/../pages/no-auth.html"));
   };

   userMiddlewares.timeStamp = (req, res, next) => {
     let d = new Date();
     let milliseconds = d.getMilliseconds();

     let date = d.toLocaleDateString(undefined, {
       day: "2-digit",
       month: "2-digit",
       year: "numeric",
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit"
     });

     let logTxt = `
        DATE: ${date}:${milliseconds}
        DATA: ${JSON.stringify(req.body)}
      `;

     const logger = fs.createWriteStream("log.txt", { flags: "a" });

     logger.end(logTxt);

     next();
   };

   let today = new Date().toLocaleTimeString();

   module.exports = userMiddlewares;
   ```

4. Adjust `routes/user.js` to look like the following

   ```js
   const fs = require("fs");
   const { Router } = require("express");
   const router = Router();
   const { checkAuth, timeStamp } = require("../middlewares/users.middleware");

   let users = [];

   fs.readFile("database.json", (err, data) => {
     if (err) throw err;

     users = JSON.parse(data);
   });

   // get all users
   router.get("/users", checkAuth, (req, res) => {
     res.status(200).json({ success: true, data: users });
   });

   // get user by id
   router.get("/users/:id", checkAuth, (req, res) => {
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

   // add new user
   router.post("/users", timeStamp, (req, res) => {
     const newUser = req.body;
     users.push(newUser);

     let data = JSON.stringify(users);
     fs.writeFileSync("database.json", data);

     res.status(200).json(users);
   });

   module.exports = router;
   ```

## Activity

1. Using Postman, make a get request to `http://localhost:4000`
2. Make a get request to `http://localhost:4000/abc`
3. Make a get request to `http://localhost:4000/users`
4. Make a get request to `http://localhost:4000/users?auth=true`
5. Make a get request to `http://localhost:4000/users/2`
6. Make a get request to `http://localhost:4000/users/2?auth=true`
7. Make a post request to `http://localhost:4000/users` with the following data

   ```js
   { id: 3, name: 'Kris Santos' }
   ```

8. Did you notice a `log.txt` file created in the root of your project? Check it out 😊
