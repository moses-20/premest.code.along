# PreMEST Code Along React (Components)

## Introduction

By following this guide, you will build React Components and make use of your JavaScript knowledge

## Getting Started

1. Create a new react app using `npx create-react-app profiles`
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Practice the concept of React Components
- Build a single page React app
- Use JavaScript `Array.map` method

## Instructions

1. Remove everything in `App.js` and add the following

   ```jsx
   function App() {
     return (
       <div>
         <h1> Writer Profiles </h1>
         <div className="container"></div>
       </div>
     );
   }
   ```

2. Copy the images folder from this directory and paste it in the public folder of your project.

3. Delete `App.css` file

4. Remove everything in `index.css` file and add the following

   ```css
   * {
     margin: 0;
     padding: 0;
   }

   body {
     background-color: #ffdeca;
   }

   h1 {
     text-align: center;
     margin: 20px;
     color: #2c1203;
     text-transform: uppercase;
     text-decoration: underline;
   }
   ```

5. Create a file `writers.js` and add the following

   ```js
   const writers = [
     {
       id: 1,
       name: "Audre Lorde",
       avatar: "audre_lorde",
       email: "audrelorde@email.com",
       phone: "1-770-736-8031"
     },
     {
       id: 2,
       name: "Du Bois",
       avatar: "du_bois",
       email: "dubois@email.com",
       phone: "1-463-123-4447"
     },
     {
       id: 3,
       name: "Belle Hooks",
       avatar: "belle_hooks",
       email: "bellehooks@email.com",
       phone: "010-692-6593 x09125"
     },
     {
       id: 4,
       name: "James Baldwin",
       avatar: "james_baldwin",
       email: "jamesbaldwin@email.com",
       phone: "1-477-935-8478 x6430"
     },
     {
       id: 5,
       name: "Maya Angelou",
       avatar: "maya_angelou",
       email: "mayaangelou@email.com",
       phone: "493-170-9623 x156"
     }
   ];

   export default writers;
   ```

6. In `App.js`

   ```jsx
   import writers from "./writers";

   function App() {
     return (
       <div>
         <h1> Writer profiles </h1>
         <div className="container">
           {writers.map((writer) => (
             <div key={writer.id} className="card">
               <img
                 src={`images/${writer.avatar}.png`}
                 height="300px"
                 width="300px"
                 alt={writer.img}
               />
               <div className="textGroup">
                 <h3>{writer.name}</h3>
                 <p>{writer.email}</p>
                 <p>{writer.phone}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
     );
   }

   export default App;
   ```

7. In `index.css` add the following below the style rules for `h1`

   ```css
   .container {
     display: flex;
     flex-wrap: wrap;
     max-width: 80%;
     margin: auto;
   }

   .card {
     margin: 20px auto;
     max-width: 300px;
     background: coral;
     box-shadow: 3px 2px 3px silver;
     transition: all 0.3s ease-in-out;
   }

   .card:hover {
     transform: scale(1.03);
     box-shadow: 5px 5px 10px whitesmoke;
   }

   .textGroup {
     padding: 10px 0;
     text-align: center;
     color: white;
   }
   ```

8. In the terminal

   ```bash
   git add .
   git commit -m 'complete writer profiles app'
   ```

9. Push your project to GitHub
