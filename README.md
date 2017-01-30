# AnotherPiNodeGarageOpener
Yet another version of a Pi garage door opener powered by Node.js

## Before You Begin

_NOTES:_ 

* I am using the latest version of Visual Studio code.  Some options below may be different in another IDE.

* I am are using the local version of Typescript to build this project.  Be sure to uninstall global tsc.  Running tsc from your terminal application _SHOULD NOT_ return a result.

* I am are using a local version of gulp.  You are not required to have gulp installed

* the rimraf NPM module is required globally and must be installed

## Getting Started

Pull the project locally.  Before opening the project in VS Code, go to the directory and run "npm install"

Once npm install is complete run "npm run typings:install" to install typings

Once npm install is complete, open the api directory in Visual Studio Code (or IDE of choice).  Visual Studio Code will use the locally installed version of Typescript.

Run "npm run start" to have Typescript compile on change and also have nodemon run the server.js script.

Run "npm clean" to remove all generated *.js files and the node_modules directory.

## Using Typings

### Search for a Typing
    npm run typings -- search node

### Install/Update Typing
    npm run typings -- install node --global --source dt --save

## Publishing

To publish the project to the "dist" directory use "npm run publish".  This will build a clean solution and copy it to the "dist" directory.