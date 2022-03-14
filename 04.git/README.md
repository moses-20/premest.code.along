# PreMEST Git Code Along

## Introduction

By following the instructions contained here, you will design a simple webpage while using Git to track changes.

## Getting Started

1. Ensure you have git installed on your system
2. Signup for a GitHub account if you don't have one
3. Configure git with your GitHub credentials by running
   ```
   git config --global user.name <your github username>
   git config --global user.email <email you used for GitHub>
   ```
4. Live Server extension

## Objectives

- Gain practical knowledge of Git
- Learn best git practices
- Use Git and GitHub to collaborate

## Instructions

1.  Create a repo called `animate` on your GitHub account. Clone it (don't download as zip) and open with VS Code
2.  Create a file named `index.html`
3.  Add the following code

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles.css" />
        <title>Learning Git</title>
      </head>
      <body>
        <h1>In the beginning</h1>
      </body>
    </html>
    ```

4.  Create a folder `img` add the images found here
5.  Using the terminal in VS Code, initialize git

    ```bash
    git init
    ```

6.  Create another file `style.css` add the following

    ```css
    h1 {
      text-align: center;
    }
    ```

7.  Save all files and serve `index.html` using `Live Server` extension in VS Code
8.  In the terminal the following lines one after the other.

    ```bash
    git add index.html style.css
    git commit -m 'initial commit'
    ```

9.  In `index.html`, replace `<h1> In the beginning </h1>` with the following

    ```html
    <div>
      <div class="loop-wrapper">
        <div class="mountain"></div>
        <div class="hill"></div>
        <div class="tree"></div>
        <div class="tree"></div>
        <div class="tree"></div>
        <div class="rock"></div>
        <div class="truck"></div>
        <div class="wheels"></div>
      </div>
    </div>
    ```

10. In the terminal type the lines one after the other

    ```bash
    git status
    git add .
    git commit -m 'change content in index.html file'
    ```

11. Create a new git branch

    ```bash
    git checkout -b develop
    ```

12. In `styles.css` file add the following

    ```css
    body {
      background: #009688;
      overflow: hidden;
      font-family: "Open Sans", sans-serif;
    }
    .loop-wrapper {
      margin: 0 auto;
      position: relative;
      display: block;
      width: 600px;
      height: 250px;
      overflow: hidden;
      border-bottom: 3px solid #fff;
      color: #fff;
    }
    .mountain {
      position: absolute;
      right: -900px;
      bottom: -20px;
      width: 2px;
      height: 2px;
      box-shadow: 0 0 0 50px #4db6ac, 60px 50px 0 70px #4db6ac,
        90px 90px 0 50px #4db6ac, 250px 250px 0 50px #4db6ac,
        290px 320px 0 50px #4db6ac, 320px 400px 0 50px #4db6ac;
      transform: rotate(130deg);
      animation: mtn 20s linear infinite;
    }
    .hill {
      position: absolute;
      right: -900px;
      bottom: -50px;
      width: 400px;
      border-radius: 50%;
      height: 20px;
      box-shadow: 0 0 0 50px #4db6ac, -20px 0 0 20px #4db6ac,
        -90px 0 0 50px #4db6ac, 250px 0 0 50px #4db6ac, 290px 0 0 50px #4db6ac, 620px
          0 0 50px #4db6ac;
      animation: hill 4s 2s linear infinite;
    }
    .tree,
    .tree:nth-child(2),
    .tree:nth-child(3) {
      position: absolute;
      height: 100px;
      width: 35px;
      bottom: 0;
      background: url(img/tree.svg) no-repeat;
    }
    .rock {
      margin-top: -17%;
      height: 2%;
      width: 2%;
      bottom: -2px;
      border-radius: 20px;
      position: absolute;
      background: #ddd;
    }
    .truck,
    .wheels {
      transition: all ease;
      width: 85px;
      margin-right: -60px;
      bottom: 0px;
      right: 50%;
      position: absolute;
      background: #eee;
    }
    .truck {
      background: url(img/truck.svg) no-repeat;
      background-size: contain;
      height: 60px;
    }
    .truck:before {
      content: " ";
      position: absolute;
      width: 25px;
      box-shadow: -30px 28px 0 1.5px #fff, -35px 18px 0 1.5px #fff;
    }
    .wheels {
      background: url(img/wheels.svg) no-repeat;
      height: 15px;
      margin-bottom: 0;
    }
    .tree {
      animation: tree 3s 0s linear infinite;
    }
    .tree:nth-child(2) {
      animation: tree2 2s 0.15s linear infinite;
    }
    .tree:nth-child(3) {
      animation: tree3 8s 0.05s linear infinite;
    }
    .rock {
      animation: rock 4s -0.53s linear infinite;
    }
    .truck {
      animation: truck 4s 0.08s ease infinite;
    }
    .wheels {
      animation: truck 4s 0.001s ease infinite;
    }
    .truck:before {
      animation: wind 1.5s 0s ease infinite;
    }
    ```

13. In the temrinal

    ```bash
    git add .
    git commit -m 'add style and animation names to elements'

    ```

14. Push your changes to GitHub

    ```bash
    git push origin develop
    ```

15. Visit GitHub and merge your changes to the default branch (called `main` or `master`)
16. Back in your project terminal, switch to the default branch

    ```bash
    # if you get a git error, change `main` to `master` in the commands below
    git checkout main
    git pull origin main
    ```

17. Open the `styles.css` and add the following

    ```css
    @keyframes tree {
      0% {
        transform: translate(1350px);
      }
      50% {
      }
      100% {
        transform: translate(-50px);
      }
    }
    @keyframes tree2 {
      0% {
        transform: translate(650px);
      }
      50% {
      }
      100% {
        transform: translate(-50px);
      }
    }
    @keyframes tree3 {
      0% {
        transform: translate(2750px);
      }
      50% {
      }
      100% {
        transform: translate(-50px);
      }
    }

    @keyframes rock {
      0% {
        right: -200px;
      }
      100% {
        right: 2000px;
      }
    }
    @keyframes truck {
      0% {
      }
      6% {
        transform: translateY(0px);
      }
      7% {
        transform: translateY(-6px);
      }
      9% {
        transform: translateY(0px);
      }
      10% {
        transform: translateY(-1px);
      }
      11% {
        transform: translateY(0px);
      }
      100% {
      }
    }
    @keyframes wind {
      0% {
      }
      50% {
        transform: translateY(3px);
      }
      100% {
      }
    }
    @keyframes mtn {
      100% {
        transform: translateX(-2000px) rotate(130deg);
      }
    }
    @keyframes hill {
      100% {
        transform: translateX(-2000px);
      }
    }
    ```

18. Commit your changes by doing

    ```bash
    git checkout develop
    git add .
    git commit -m 'add animation style rules to css file'
    git push origin develop
    ```

19. Repeat steps 14 and 15
