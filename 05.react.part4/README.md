# PreMEST Code Along React (Evnets)

## Introduction

By following this guide, you will practice `useState hook` in the writer profiles application

## Getting Started

1. Continue with the previous React App
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Use React useState hook

## Instructions

1. Continue with the application you have already

2. Change everything `App.js` to the following

   ```jsx
   import ProfileCard from "./components/ProfileCard";
   import { useState } from "react";

   function App() {
     const [writers, setWriters] = useState({
       loading: false,
       list: []
     });

     const handleClick = () => {
       setWriters((previousState) => ({
         ...previousState,
         loading: true
       }));

       setTimeout(async () => {
         let resp = await fetch("/writers.json");
         let result = await resp.json();

         setWriters((previousState) => ({
           ...previousState,
           loading: false,
           list: result
         }));
       }, 2500);
     };

     if (writers.loading) {
       return (
         <div>
           <h1> Writer Profiles </h1>
           <div className="container">
             <div className="card action">
               <p className="infoText"> Loading... </p>
             </div>
           </div>
         </div>
       );
     }

     return (
       <div>
         <h1> Writer Profiles </h1>
         <div className="container">
           {writers.list.length === 0 ? (
             <div className="card action">
               <p className="infoText"> Oops... no writer profile found</p>
               <button className="actionBtn" onClick={handleClick}>
                 Get Writers
               </button>
             </div>
           ) : (
             writers.list.map((writer) => (
               <ProfileCard key={writer.id} writer={writer} />
             ))
           )}
         </div>
       </div>
     );
   }

   export default App;
   ```

3.
