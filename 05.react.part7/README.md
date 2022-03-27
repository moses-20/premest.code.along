# PreMEST Code Along React (Custom Hooks)

## Introduction

By following this guide, you will be able to create a custom hook called `useLocalStorage`. This hook will help you persist data in the local storage of your browser unlike React `useState` that cannot persist data.

## Getting Started

1. Continue with your existing project
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Create and use a custom hook
- Manage JavaScript object with a custom hook
- Use JavaScript `localStorage` api to store and retrieve data

## Instructions

1. Copy the `index.css` file from this repo and replace it in your project
2. Create a folder `components` and copy the `ProfileCard.js` and `ProfileForm.js` files from this repo into it
3. Create a folder called `hooks`. Inside it, create a file `useLocalStorage.js`

   ```jsx
   import { useState } from "react";

   function useLocalStorage(key, initialValue) {
     const [storedValue, setStoreValue] = useState(() => {
       if (typeof window === "undefined") {
         return initialValue;
       }

       try {
         const item = window.localStorage.getItem(key);

         return item ? JSON.parse(item) : initialValue;
       } catch (error) {
         console.log(error);
         return initialValue;
       }
     });

     const setValue = (value) => {
       try {
         setStoreValue(value);

         if (typeof window !== "undefined") {
           window.localStorage.setItem(key, JSON.stringify(value));
         }
       } catch (error) {
         console.log(error);
       }
     };

     return [storedValue, setValue];
   }

   export default useLocalStorage;
   ```

4. Inside the `App.js` file, replace everything with the following

   ```jsx
   import useLocalStorage from "./hooks/useLocalStorage";
   import ProfileForm from "./components/ProfileForm";
   import ProfileCard from "./components/ProfileCard";

   function App() {
     const [profiles, setProfiles] = useLocalStorage("profiles", []);

     const updateProfiles = (profile) => {
       let arr = profiles;
       arr.push(profile);
       setProfiles([...arr]);
     };

     return (
       <div className="app">
         <h1> Profile Maker </h1>
         <div>
           <ProfileForm submit={updateProfiles} />
           <hr />
           <div className="list">
             {profiles.map((person, index) => (
               <ProfileCard key={index} card={person} />
             ))}
           </div>
         </div>
       </div>
     );
   }

   export default App;
   ```

5. This app is almost same like the one you build for the React Forms code along. However the difference is that this one will save you data to localStorage and you can retrieve it when you restart the app.
