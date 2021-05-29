# FRAMES

## A scaffolding package to bootstrap boilerplates

```
  ——————————————————————————————————————
    _____
   |  ___| __ __ _ _ __ ___   ___  ___
   | |_ | '__/ _` | '_ ` _ \ / _ \/ __|
   |  _|| | | (_| | | | | | |  __/\__ \
   |_|  |_|  \__,_|_| |_| |_|\___||___/

  ——————————————————————————————————————

            WELCOME TO FRAMES!

          The Scaffolding package

  ——————————————————————————————————————

? Please select your framework (Use arrow keys)
  ————————————————————————————
❯ React
  Vite-React
  Vite-Vue
  Next.js
  Django
  ————————————————————————————
  Help
  Exit
  ————————————————————————————

```

## How to install

```bash
yarn global add @gbrachetta/frames
```

or using `npm`

```bash
npm -i -g @gbrachetta/frames
```

## How to use

Run `frames` in your terminal and select one of the options in the menu.

## Description

`Frames` creates a starting template in the chosen framework. It comes setup with several features:

- React, Next.js, Vite-React, Vite-Vue:

  - Linters and formatters are preconfigured.
  - The app starts after linting, formatting and commiting to a local git repository.

- Django:

  - It assumes using AWS to store static files, and the production variables have been added accordingly (but they only load in case there's a `USE_AWS=True` variable in the environment).
  - It also assumes deploying on Heroku to make use of their database, but that can be easily changed to any other database set of variables in `your-app-name/settings/production.py`.
  - Provides a script to rename the project.
  - It includes a handy django toolbar (only available in the development environment) that facilitates debugging.
  - The app also includes useful settings to develop a Django app on VS Code, and a `launch.json` file to run the server in debugging mode using the integrated debugger in VS Code. Feel free to delete these and the parent `.vscode` folder if you use some other editor.
  - It uses split settings for dev and prod.

> **Run `Frames` in the parent folder of the project to be created**
