# PreMEST Code Along React (Forms)

## Introduction

By following this guide, you will be able to use forms in a React Application

## Getting Started

1. Create a new React App
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Manage JavaScript object with React useState hook
- Use JavaScript `spread operator`
- Pass functions as a prop to a component

## Instructions

1. Copy the `index.css` file from this repo and replace it in your project
2. Create a folder `components` and copy the `ProfileCard.js` file from this repo into it
3. Still in the `components` foleder, create a file `ProfileForm.js` and add the following to it

   ```jsx
   import { useState } from "react";

   function ProfileForm({ submit }) {
     const [profile, setProfile] = useState({
       firstName: "",
       lastName: "",
       email: "",
       phone: ""
     });

     const handler = (event) => {
       setProfile((prev) => ({
         ...prev,
         [event.target.name]: event.target.value
       }));
     };

     const handleForm = (e) => {
       e.preventDefault();
       submit(profile);
     };

     return (
       <div className="formContainer">
         <h3>Profile Form</h3>
         <form>
           <fieldset>
             <legend> Bio Data </legend>
             <div className="names">
               <label>
                 First Name
                 <input
                   name="firstName"
                   value={profile.firstName}
                   onChange={handler}
                   type="text"
                 />
               </label>
               <label>
                 Last Name
                 <input
                   name="lastName"
                   value={profile.lastName}
                   onChange={handler}
                   type="text"
                 />
               </label>
             </div>
             <div className="names">
               <label>
                 Email
                 <input
                   name="email"
                   value={profile.email}
                   onChange={handler}
                   type="email"
                 />
               </label>
               <label>
                 Phone
                 <input
                   name="phone"
                   value={profile.phone}
                   onChange={handler}
                   type="tel"
                 />
               </label>
             </div>
           </fieldset>
           <button className="form" onClick={handleForm}>
             Add Profile
           </button>
         </form>
       </div>
     );
   }

   export default ProfileForm;
   ```

4. Inside the `App.js` file, replace everything with the following

   ```jsx
   import { useState } from "react";
   import ProfileForm from "./components/ProfileForm";
   import ProfileCard from "./components/ProfileCard";

   function App() {
     const [allProfiles, setAllProfiles] = useState([
       {
         firstName: "Gbemu",
         lastName: "Terra",
         email: "gbemu@google.com",
         phone: "0240123456"
       }
     ]);

     const updateProfiles = (profile) => {
       let arr = allProfiles;
       arr.push(profile);
       setAllProfiles([...arr]);
     };

     return (
       <div className="app">
         <h1> Profile Maker </h1>
         <div>
           <ProfileForm submit={updateProfiles} />
           <hr />
           <div className="list">
             {allProfiles.map((person, index) => (
               <ProfileCard key={index} card={person} />
             ))}
           </div>
         </div>
       </div>
     );
   }

   export default App;
   ```

5. Can you think of a way to add images? We can explore that in upcoming lessons 😊
