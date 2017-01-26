/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Server instance to kick off the whole server (instance ha)
 */

import express = require('express');
import appHelper = require('./lib/app');
let app = appHelper.createServer();
import logger from "./lib/util/logger";

//now fire up our express server
var server = app.listen(appHelper.serverPort, ()=> {
    console.info("Starting server on port %s", server.address().port);     
    logger.info(`Starting server on port ${server.address().port}`, "server");
});