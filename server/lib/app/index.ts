/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Express application set up    
 */
import * as express from "express";
import * as config from "./config";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as uLog from "../util/logger";
import path = require('path');
import BaseController from "../controllers/baseController";

//wire up our app via init function
function init(app: express.Application) {

    //logging
    uLog.attachExpressLog(app);

    //set up cores middleware
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        //below is in seconds
        res.header("Access-Control-Max-Age", "500");        
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //insert any pre request handling here
    app.use(bodyParser.json());
    app.use(compression());

    //routes start here!
    
    //TODO real controllers here
    //_addController(app, "/user", require("../controllers/userController"));

    //dev only routes and handlers
    if(config.isDev){
        _addController(app, "/apitest", require("../controllers/apiTestController"));
    }

    //html routes start here
    var renderIndex = (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, '../../../client/index.html'));
    }

    //TODO additional HTML client paths here

    app.get('/*', renderIndex);

    //404 handler
    app.use(function (req, res, next) {
        var error = <IStatusError> new Error("Item not found");
        error.status = 404;
        next(error);
    });
    
    //error handler
    app.use(function (error, req, res: express.Response, next) {
        var status = error.status || 500;
        var message = error.message || error.errorMsg || "An error occurred";
        res.statusCode = status;
        //note: this assumes only a API json response (no html)
        var errorRes = {
            message: message
        };
        if(config.isDev && status !== 404) {
            errorRes["stack"] = error.stack;
            errorRes["source"] = error.source;
            errorRes["detail"] = error.detail
        }
        if (status !== 404) {
            uLog.default.error("express error", error.source || "NA", errorRes);
        }
        res.json(errorRes);
    });
}

/**
 * helper to add our controllers based on the baseController
 */
function _addController(app: express.Application, routePath: string, controller: BaseController) {
    app.use(routePath, controller.getRouter());
}

export function createServer(): express.Application {
    var app = express();
    init(app);
    return app;  
};

export var serverPort = config.serverPort;