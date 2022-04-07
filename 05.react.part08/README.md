# PreMEST Code Along React (React Router Part 1)

## Introduction

By following this guide, you will be able to build a basic webpage layout with webpage links using react-router-dom

## Getting Started

1. Create a new react app
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Use React Higher Order Components for page layout
- Link webpages using react-router-dom (version 6)

## Instructions

1. Copy the `styles` folder into your project
2. In your project terminal run `npm install react-router-dom`
3. Replace `index.js`, with the following

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   import App from "./App";
   import "./styles/index.css";

   ReactDOM.render(
     <BrowserRouter>
       <App />
     </BrowserRouter>,
     document.getElementById("root")
   );
   ```

4. Inside `src` Create a folder called `pages`
5. Inside `pages` folder, create a file `withLayout.js`

   ```jsx
   import { Link } from "react-router-dom";

   function withLayout(Component) {
     function Layout() {
       return (
         <div className="layout">
           <header className="appbar">
             <span>Logo</span>
             <div>
               <nav>
                 <span className="nav-link">
                   <Link to="/">Home</Link>
                 </span>
                 <span className="nav-link">
                   <Link to="/about">About</Link>
                 </span>
                 <span className="nav-link">
                   <Link to="/blog">Blog</Link>
                 </span>
               </nav>
             </div>
           </header>
           <main className="main-component">
             <Component />
           </main>
           <footer>&copy; 2022 PreMEST</footer>
         </div>
       );
     }

     return Layout;
   }

   export default withLayout;
   ```

6. Inside pages, create files `Home.js`, `About.js`, and `Blog.js`. Add the following code to the components and only change their names accordingly

   ```jsx
   import withLayout from "./withLayout";

   function Home() {
     return (
       <div>
         <h1> Welcome to the Homepage </h1>

         <div>
           <p>
             Excepteur laboris proident reprehenderit dolore quis culpa laboris
             nostrud ad laboris incididunt. Do elit minim veniam culpa minim
             voluptate nostrud laborum proident commodo laborum labore tempor
             dolor. Officia ea aliqua ipsum sunt mollit commodo aliquip pariatur
             exercitation cillum eiusmod.
           </p>
           <p>
             Excepteur laboris proident reprehenderit dolore quis culpa laboris
             nostrud ad laboris incididunt. Do elit minim veniam culpa minim
             voluptate nostrud laborum proident commodo laborum labore tempor
             dolor. Officia ea aliqua ipsum sunt mollit commodo aliquip pariatur
             exercitation cillum eiusmod.
           </p>
           <p>
             Excepteur laboris proident reprehenderit dolore quis culpa laboris
             nostrud ad laboris incididunt. Do elit minim veniam culpa minim
             voluptate nostrud laborum proident commodo laborum labore tempor
             dolor. Officia ea aliqua ipsum sunt mollit commodo aliquip pariatur
             exercitation cillum eiusmod.
           </p>
         </div>
       </div>
     );
   }

   export default withLayout(Home);
   ```

7. Replace everything in `App.js` with the following

   ```jsx
   import { Route, Routes, Navigate } from "react-router-dom";
   import Home from "./pages/Home";
   import About from "./pages/About";
   import Blog from "./pages/Blog";

   function App() {
     return (
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/blog" element={<Blog />} />
         <Route path="*" element={<Navigate to="/" />} />
       </Routes>
     );
   }

   export default App;
   ```

8. Viola! you have create a basic React website with page routing 🥳
