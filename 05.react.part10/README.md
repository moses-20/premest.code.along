# PreMEST Code Along React (React Context Part One)

## Introduction

By following this guide, you will be able to make use of React Context API to pass data to deep nested components

## Objectives

- Use React's Context API
- Wrap a Context with a Custom hook
- Consume data from a context

## Instructions

1. Continue with the app you created yesterday or you odownload zip from from [here](https://github.com/moses-20/premest.source.code.along/tree/react.router.two)
2. Create a folder `context` and inside it a file `about.context.js`. Add the following code to the file

   ```jsx
   import { createContext, useContext } from "react";

   const AboutContext = createContext();

   function AboutContextProvider({ children }) {
     const about = {
       name: "Gbemu Terra",
       hobbies: ["Dancing", "Skating", "Skipping"],
       bio: "Aliqua occaecat cillum non ea ipsum esse esse proident pariatur deserunt."
     };

     return (
       <AboutContext.Provider value={{ about }}>
         {children}
       </AboutContext.Provider>
     );
   }

   function useAboutContext() {
     return useContext(AboutContext);
   }

   export { AboutContextProvider, useAboutContext };
   ```

3. Modify `App.js`

   ```jsx
   import { Route, Routes, Navigate } from "react-router-dom";
   import Home from "./pages/Home";
   import About from "./pages/About";
   import Blog from "./pages/Blog";
   import BlogList from "./pages/Blog/blogs";
   import BlogDetail from "./pages/Blog/detail";
   import { AboutContextProvider } from "./context/about.context";

   function App() {
     return (
       <AboutContextProvider>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/blog" element={<Blog />}>
             <Route index element={<BlogList />} />
             <Route path=":blog" element={<BlogDetail />} />
           </Route>
           <Route path="*" element={<Navigate to="/" />} />
         </Routes>
       </AboutContextProvider>
     );
   }

   export default App;
   ```

4. Modify `About.js` inside the pages directory

   ```jsx
   import withLayout from "./withLayout";
   import { useAboutContext } from "../context/about.context";

   function About() {
     const { about } = useAboutContext();
     return (
       <div
         style={{
           maxWidth: "700px",
           margin: "auto",
           padding: "20px 0"
         }}
       >
         <h2>About Me</h2>
         <div style={{ marginTop: "10px" }}>
           <h3>Name</h3>
           <p>{about.name}</p>
         </div>
         <div style={{ marginTop: "10px" }}>
           <h3>Bio</h3>
           <p>{about.bio}</p>
         </div>
         <div style={{ marginTop: "10px" }}>
           <h3>Hobbies</h3>
           {about.hobbies.map((hobby) => (
             <p
               key={hobby}
               style={{ display: "inline-block", marginRight: "10px" }}
             >
               {hobby}
             </p>
           ))}
         </div>
       </div>
     );
   }

   export default withLayout(About);
   ```

5. Voila! Next up, you will use React Context to create dark and light theme for the web app. Stay tuned 😉
