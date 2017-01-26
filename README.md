# AnotherPiNodeGarageOpener
Yet another version of a Pi garage door opener powered by Node.js

## Before You Begin

_NOTES:_ 

* I am using the latest version of Visual Studio code.  Some options below may be different in another IDE.

* I am are using the local version of Typescript to build this project.  Be sure to uninstall global tsc.  Running tsc from your terminal application _SHOULD NOT_ return a result.

* I am are using a local version of gulp.  You are not required to have gulp installed

* npm install will install rimraf globally if you do not have it installed.

## Getting Started

Pull the project locally.  Before opening the project in VS Code, go to the directory and run "npm install".  Note, I am currently running in Windows Powershell...

Once npm install is complete, open the api directory in Visual Studio Code (or IDE of choice).  Visual Studio Code will use the locally installed version of Typescript.

Run "npm run start" to have Typescript compile on change and also have nodemon run the server.js script.

Run "npm clean" to remove all generated *.js files and the node_modules directory.

## Using Typings

### Search for a Typing
    npm run typings -- search node

### Install/Update Typing
    npm run typings -- install node --global --source dt --save
