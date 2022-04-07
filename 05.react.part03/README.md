# PreMEST Code Along React (Events)

## Introduction

By following this guide, you will enhance the writer profiles application by listening for events and responding accordingly

## Getting Started

1. Continue with the previous React App
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Add function handlers for click events
- Use conditional rendering to for profile card contents

## Instructions

1. Copy the `writers.json` file and the images folder from this repo and replace it in the public folder of your project

2. In the file `ProfileCard.js`. Add the following

   ```jsx
   import { useState } from "react";

   function ProfileCard({ writer }) {
     const [showBio, setShowBio] = useState(false);
     const handleClick = (bioData) => {
       setShowBio(!showBio);
     };

     return (
       <div className="card">
         <div className="cardContent">
           {showBio ? (
             <div className="bioWrap">
               <p className="bio">{writer.bio}</p>
             </div>
           ) : (
             <img
               src={`images/${writer.avatar}.png`}
               width="300px"
               alt={writer.img}
             />
           )}
         </div>
         <div className="textGroup">
           <h3>{writer.name}</h3>
           <p>{writer.email}</p>
           <p>{writer.phone}</p>

           <button
             className="actionBtn"
             onClick={() => handleClick(writer.bio)}
           >
             {showBio ? "View Image" : "Read Bio"}
           </button>
         </div>
       </div>
     );
   }

   export default ProfileCard;
   ```

3. In `index.css` file, change the style rules for `.card`

   ```css
   .card {
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     margin: 20px auto;
     max-width: 300px;
     background: coral;
     border-radius: 2px;
     box-shadow: 3px 2px 3px silver;
     transition: all 0.3s ease-in-out;
   }
   ```

4. Add the following rules at the bottom of the file

   ```css
   .cardContent {
     height: 300px;
   }

   .bioWrap {
     color: whitesmoke;
     margin: 15px;
     text-align: justify;
   }
   ```

5. There more you can do with React events, in the upcoming lessons, you'll learn more of them.
