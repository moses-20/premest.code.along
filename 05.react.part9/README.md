# PreMEST Code Along React (React Router Part 2)

## Introduction

By following this guide, you will be able to build a basic webpage layout with webpage links using react-router-dom

## Objectives

- App navigation with `useNavigation` from react-router-dom
- Querying location state from `useLocation` from react-router-dom
- Dynamic navigation with `react-router-dom` (version 6)
- Redirect with react-router-dom

## Instructions

1. Continue with the app you created yesterday or you odownload zip from from [here](https://github.com/moses-20/premest.source.code.along/tree/react.router.one)
2. Delete `Blog.js` file and create a folder `Blog` in pages directory and add the files `index.js`, `blogs.js`, and `detail.js` into it
3. Contents for the files can be found [here](https://github.com/moses-20/premest.source.code.along/tree/react.router.two/src/pages/Blog)
4. Change `App.js` to the following

   ```jsx
   import { Route, Routes, Navigate } from "react-router-dom";
   import Home from "./pages/Home";
   import About from "./pages/About";
   import Blog from "./pages/Blog";
   import BlogList from "./pages/Blog/blogs";
   import BlogDetail from "./pages/Blog/detail";

   function App() {
     return (
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/blog" element={<Blog />}>
           <Route index element={<BlogList />} />
           <Route path=":blog" element={<BlogDetail />} />
         </Route>
         <Route path="*" element={<Navigate to="/" />} />
       </Routes>
     );
   }

   export default App;
   ```

5. Hurray! now you're a ReactJS guru 🔥🔥🔥
