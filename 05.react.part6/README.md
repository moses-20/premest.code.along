# PreMEST Code Along React (useEffect)

## Introduction

By following this guide, you will be able to use React useEffect hook to make instant API calls

## Getting Started

1. Create a new React App or Edit your previous app
2. Make sure you have the following VS Code Extensions installed
   - ESLint
   - Prettier

## Objectives

- Use React useEffect hook
- Use Axios package to make api call

## Instructions

1. Install `axios` package by running `npm install axios` or `yarn add axios` if you use yarn

2. Edit your `App.js` file

```jsx
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await Axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts"
      });

      setPosts(response.data);
    })();
  });

  return (
    <div className="app">
      <h1> Profile Maker </h1>
      <div>
        <div className="list">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
```

3. Add these styles to the index.css file

   ```css
   @import url("https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap");

   * {
     margin: 0;
     padding: 0;
     font-family: "Mulish", sans-serif;
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

   .post {
     margin: 10px auto;
     max-width: 500px;
     padding: 10px;
     background-color: coral;
   }

   .post > h3 {
     text-align: center;
   }
   ```

4. In future lessons, you will learn to perform side effects with useEffect hook
