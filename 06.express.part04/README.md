# PreMEST Code Along Express (Middlewares)

## Introduction

By following this guide, you will be able to create and use custom Express middlewares

## Objectives

- Add multiple middleware handlers
- Add handlers for query parameters
- Handle `put` requests

## Instructions

1. Continue with the project you are working on
2. Create a file `books.json` in the root of your project and add just `[]` in it
3. In the `routes` folder, create a folder called `handlers` and inside it a file `books.handler.js`. Add the following

   ```js
   const fs = require("fs");

   let books = [];

   fs.readFile("books.json", (err, data) => {
     if (err) throw err;

     books = JSON.parse(data);
   });

   const booksHandlers = {};

   booksHandlers.byCategory = (req, res, next) => {
     const category = req.query.category;

     if (category) {
       let _books = books.filter((b) => b.category == category);

       return res.status(200).json({ success: true, data: _books });
     }

     next();
   };

   booksHandlers.byAuthor = (req, res, next) => {
     const author = req.query.author;

     if (author) {
       let _author = books.filter((b) => b.author == author);

       return res.status(200).json({ success: true, data: _author });
     }

     next();
   };

   module.exports = booksHandlers;
   ```

4. In the `routes` folder, create a file `books.js` and add the following

   ```js
   const fs = require("fs");
   const { Router } = require("express");
   const { byCategory, byAuthor } = require("./handlers/books.handlers");
   const router = Router();

   let books = [];

   fs.readFile("books.json", (err, data) => {
     if (err) throw err;

     books = JSON.parse(data);
   });

   // adding middlewares to filter books by category or by author
   router.get("/books", [byCategory, byAuthor], (req, res) => {
     res.status(200).json({ success: true, data: books });
   });

   router.post("/books", (req, res) => {
     const book = req.body;
     books.push(book);

     let data = JSON.stringify(books);
     fs.writeFileSync("books.json", data);

     res.status(200).json({ success: true, data: books });
   });

   // update book details by isbn [international standard book number]
   router.put("/books", (req, res) => {
     const isbn = req.query.isbn;
     const data = req.body;

     let book = books.filter((b) => b.isbn == isbn);
     let _book = { ...book[0], ...data };

     books = books.map((b) => (b.isbn == isbn ? _book : b));

     fs.writeFileSync("books.json", JSON.stringify(books));

     res.status(200).json({ books });
   });

   module.exports = router;
   ```

5. Update `index.js` file to look like the following

   ```js
   const path = require("path");
   const express = require("express");

   const app = express();
   const userRoute = require("./routes/user");
   const booksRoute = require("./routes/books");

   app.use(express.json());

   app.use(userRoute);
   app.use(booksRoute);

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

## Activity

1. Using Postman, make a post request to `http://localhost:4000/books` with the following **one after the other**

   ```json
   {
    "title": "The Green Gourde",
    "author": "Karmah Larris",
    "isbn": 180415662318,
    "pages": 194,
    "category": "fiction",
    "summary": "Consequat anim minim duis in ex. Aute adipisicing nostrud veniam officia ipsum magna ex anim mollit reprehenderit sunt labore culpa. Proident id commodo pariatur exercitation."
   },
   ```

   ```json
   {
     "title": "Fastlane to Corridor",
     "author": "Yveu Ju",
     "isbn": 201846183275,
     "pages": 502,
     "category": "history",
     "summary": "Ullamco enim veniam mollit deserunt occaecat velit proident consequat tempor do voluptate enim velit proident. Aliqua do sint officia do ex ea et officia elit. Deserunt consequat laboris in anim. Veniam consectetur elit tempor cupidatat irure mollit Lorem ad ea tempor cillum occaecat magna minim. Est consequat minim dolore labore ad irure reprehenderit. Eiusmod magna nulla incididunt elit consequat commodo eiusmod nulla elit officia. Qui duis minim minim eu est culpa aute. Aliquip nisi deserunt amet esse aliquip ullamco officia labore sint duis exercitation. Aute eiusmod id amet nulla reprehenderit aute commodo fugiat aute officia sint."
   }
   ```

   ```json
   {
     "title": "Re-coil of Ten",
     "author": "Sha Malor",
     "isbn": 203819374921,
     "pages": 300,
     "category": "history",
     "summary": "Ea aliquip quis sit occaecat incididunt. Consequat Lorem et consectetur duis nostrud do. Laborum exercitation ea nulla nisi nisi. Nulla magna irure tempor anim nulla ad deserunt duis est excepteur mollit esse.Anim quis enim ut eu reprehenderit eu proident pariatur in mollit cillum officia esse. Nulla duis enim eu dolor minim eu nisi cupidatat proident excepteur nulla aliquip velit nulla. Et deserunt non ex consectetur incididunt tempor exercitation. Do labore eu minim velit. Laborum laborum amet irure id culpa cillum in magna enim eiusmod voluptate. Culpa velit ipsum laboris laborum officia est sunt adipisicing fugiat. Sint occaecat ipsum deserunt qui et laboris sit cillum fugiat minim reprehenderit."
   }
   ```

2. make a get request to `http://localhost:4000/books
3. make a get request to `http://localhost:4000/books?category=fiction
4. make a get request to `http://localhost:4000/books?category=history
5. make a get request to `http://localhost:4000/books?author=Karmah%20Larris
6. make a get request to `http://localhost:4000/books?author=Sha%20Malor
7. make a put request to `http://localhost:4000/books?isbn=201846183275 with the following data
   ```json
   { "category": "science-fiction" }
   ```
8. make a put request to `http://localhost:4000/books?isbn=203819374921 with the following data
   ```json
   { "pages": "407", "title": "Recoil of Ten" }
   ```
9. By now, you are thinking backend programming is the easiest thing in the world 😂😂😂
10. Have you thought of error handling? Can you propose a way to handle possible errors in this project?
