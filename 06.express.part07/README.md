# PreMEST Code Along Express (Middlewares)

## Introduction

By following this guide, you will be able to validate mongodb documents

## Objectives

- Manage user login in Express
- Compare passwords with `bcrypt`
- Sign `JsonWebTokens` and set response cookies

## Instructions

1. Continue with the project you are working on
2. In `models/user.model.js`, add the following at the bottom of the file

   ```js
   // check password for authentication
   userSchema.statics.login = async function (username, password) {
     try {
       const user = await this.findOne({ username });
       if (user) {
         const match = await bcrypt.compare(password, user.password);
         if (match) {
           return { auth: true, data: user };
         }

         throw new Error("incorrect password");
       }

       throw new Error("incorrect username");
     } catch (error) {
       return { auth: false, data: error.message };
     }
   };
   ```

3. In the terminal, run `npm install jsonwebtoken`
4. In `routes/handlers/user.handler.js` file and add the following to the file

   ```js
   const jwt = require("jsonwebtoken"); // at the top of the file

   // creating a bearer token
   userHandler.createToken = (id) => {
     const maxAge = 24 * 60 * 60;
     return jwt.sign({ id }, process.env.SECRET, {
       expiresIn: maxAge
     });
   };
   ```

5. In `routes/user.js` file, update the import

   ```js
   const { handleErrors, createToken } = require("./handlers/user.handler");
   ```

6. Update `router.post` handler to look like the following

   ```js
   // change `/users` to `/users/signup`
   router.post("/users/signup", timeStamp, async function (req, res) {
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
       let message = handleErrors(error);

       res.status(400).json({ success: false, body: message });
     }
   });
   ```

7. Add another post handler as follows

   ```js
   // login user
   router.post("/users/login", async function (req, res) {
     const { username, password } = req.body;

     try {
       let result = await User.login(username, password);

       if (result.auth) {
         let token = createToken(result.data._id);

         res.cookie("jwt", token, {
           httpOnly: true,
           maxAge: 24 * 60 * 60 * 1000
         });

         res.status(201).json({
           success: true,
           message: "login successful",
           body: {
             username: result.data.username
           }
         });

         return;
       }

       res
         .status(400)
         .json({ success: false, message: "incorrect username or password" });
     } catch (error) {
       let message = handleErrors(error);
       res.status(400).json({ success: false, body: message });
     }
   });
   ```

## Activity

1. Create users with invalid credentials

2. Login with the credentials. What happens when wrong crednetials are provided?

3. What other errors can you possibly handle?
