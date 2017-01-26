/*
    Copyright (c) Randy Bacon. All rights reserved.  
    Licensed under the MIT License. See LICENSE file in the project root for full license information. 
        
    Shared config for our application
*/
var internals = {
    serverPort: 3333,
    isDev: false
};

//note: using build task to change out for dist
internals.isDev = true;

//final exports
export var serverPort = internals.serverPort;
export var isDev = internals.isDev;