/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * ApiTest controller to make sure our app engine is all working
 */
import BaseController from "./baseController";

class ApiTestController extends BaseController
{
    protected _configRouter() {
        /**
         * GET: /api/test/hello/:text
         */
        this._router.get("/hello/:text", (req, res, next) => {

            this._logger.debug("ApiTestController/hello/:text", this._name);
            //get params
            let text = req.params.text;
            //do service work
            let result = <IServiceResult<string>>{
                result: `This is the result :: ${text}`
            };
            //return results via shared method
            this.sendResult(result, req, res, next);            
        });
    }
}

export = new ApiTestController();