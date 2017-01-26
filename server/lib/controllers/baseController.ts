/** 
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * BaseController: shared base controller for all our api controllers
 */

import * as express from "express";
let router = express.Router();
import logger from "../util/logger";

/**
 * default base controller for all related controllers.  implement _configRouter()
 * 
 * @export
 * @class BaseController
 */
export class BaseController {
    protected _router = express.Router();
    protected _logger = logger;
    protected _name: string = "";

    constructor()
    {
        this._name = (<any>this.constructor).name;
        this._configRouter();
    }

    /**
     * helper to send a result based on the returned IServiceResult
     */
    sendResult<T>(serviceResult: IServiceResult<T>, req, res, next)
    {
        if(!serviceResult || serviceResult.notFound || !serviceResult.result) {
            next();
        } else if(serviceResult.error) {
            var error = { detail: serviceResult.error, errorMsg: serviceResult.errorMsg, source: this._name };
            next(error);
        } else {
            res.send(serviceResult.result);
        }
    }

    public getRouter() {
        return this._router;
    }

    protected _configRouter()
    {
        throw new Error("Not implemented");
    }
}

export default BaseController;