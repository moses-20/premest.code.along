# PreMEST Code Along Express (Middlewares)

## Introduction

By following this guide, you will be able to validate mongodb documents

## Objectives

- Add document validation using mongoose
- Add custom error messages
- Use an error handler function

## Instructions

1. Continue with the project you are working on
2. Create `routes/handlers/user.handler.js` file and add the following

   ```js
   const userHandler = {};

   userHandler.handleErrors = (error) => {
     let errorData = { username: "", password: "" };

     if (error.code === 11000) {
       errorData.username = "the username is not available";

       return errorData;
     }

     // we run a simple check to know if it was a validation error
     if (error.message.includes("user validation failed")) {
       // Object is a built-in javascript constructor that we can
       // use on any javascript data-type. here, we are checking
       // for the error fields and populating the errorData variable

       Object.values(error.errors).forEach(({ properties }) => {
         errorData[properties.path] = properties.message;
       });
     }

     return errorData;
   };

   module.exports = userHandler;
   ```

3. In `routes/user.js` file, add the import

   ```js
   const { handleErrors } = require("./handlers/user.handler");
   ```

4. Update `router.post` handler to look like the following

   ```js
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
       let message = handleErrors(error);

       res.status(400).json({ success: false, body: message });
     }
   });
   ```

## Activity

1. Create users with invalid crednetials and observe what the error messages return

2. Create a user with a name that already exists and tell what error message you get

3. What other errors can you possibly handle?
