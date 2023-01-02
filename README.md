# MERNT | <small>MERN Reimagined</small>

Created by FFGFlash, MERNT is a template repository for quickly embarking on a journey with web development using an ExpressJS, MongoDB and NodeJS backend with a React frontend.

## Features

- Powered by NodeJS
- Built with TypeScript
- ExpressJS rest backend
- MongoDB database support
- React frontend
- JEST backend and frontend testing
- Prepackaged with Twin.Macro
- Webpack bundling and babel compilation
- Live frontend reloading
- ESLint, StyleLint and Prettier integration
- SCSS and SASS support

## Getting started

1. Install [NodeJS](https://nodejs.org/en/)
   - This Projects was built on version 19, but should function on LTS as well.
2. Click "Use this template" on the repository followed by "Create a new repository"
3. Once you've created your new repository, you'll want to download [Github Desktop](https://desktop.github.com) or [Git](https://git-scm.com/downloads)
   - Github Desktop is an application while Git is a command line tool
   - Some editors like VSCode use Git to access GitHub
4. Pull your repository using your chosen method above
   - Sign in to Github Desktop and pull your repository
   - Use the Command Prompt with Git
     - `git clone https://github.com/{username}/{repository}.git`
5. Once you've installed Node and setup your repository open the command prompt in your repo and run
   - `npm i --include=dev`
6. You're now ready to start working on your project

## Commands

All available commands for installing, testing, building and executing the application.

```bat
npm i --include=dev & Rem Install all the required dependencies for development and testing
npm start           & Rem Used to execute the server in production mode.
npm run build       & Rem Used to build the server for production.
npm run dev:start   & Rem Used to build and execute the server in development mode.
npm test            & Rem Used to execute tests on the client and server.
```

## Environment

Environment variables that can be used to configure the server.

- While in development these will be loaded from the ".env" file in the root directory
- Otherwise for production these should be set on the global environment

```sh
# Define the port for the server to listen to
PORT = "8080"
# Define the MongoDB host to connect to
MONGO_HOST = "mongodb://localhost"
# Define the MongoDB database to connect to
MONGO_DB = "example"
# Define the MongoDB username
MONGO_USER = "Admin"
# Define the MongoDB password
MONGO_PASS = "P@s5w0rD"
# Define the MongoDB timeout time
MONGO_TIMEOUT_MD = "5000"
# Define the Cookie Secret
SECRET = "some super secret string that should never be shared publicly"
# Define the Environment (This can by ignored as it'll be set by the appropriate commands)
NODE_ENV = "development"
```

## VSCode Setup (optional)

1. Download and install [VSCode](https://code.visualstudio.com/download)
2. Download and install [Git](https://git-scm.com/downloads) for Github integration
3. Install the following extensions
   - PostCSS Language Support by csstools
     - Adds PostCSS support
   - Prettier - Code formatter by Prettier
     - Adds Prettier support, uses the projects prettier config to all easy formatting for consistent syntax
   - Sass by Syler
     - Adds SCSS/SASS support
   - Stylelint by Stylelint
     - Adds Stylelint support, uses the projects stylelint config to force consistent CSS/SCSS syntax
   - Tailwind CSS IntelliSense by Tailwind Labs
     - Adds Tailwind support
   - Tailwind Twin IntelliSense by lightyen
     - Adds Twin.Macro support
   - vscode-styled-components by Styled Components
     - Adds Styled Component support
   - ESLint by Microsoft
     - Adds ESLint support, uses the projects eslint config to force consistent JS/TS syntax
   - ES7+ React/Redux/React-Native snippets by dsznajder
     - Adds react snippets with Babel support
   - Better Comments by Aaron Bond (optional)
     - Adds comment highlighting
4. Enjoy!
