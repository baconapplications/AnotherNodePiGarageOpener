/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Stat controller to insert and retrieve stats
 */
import BaseController from "./baseController";
import * as db from "../datalayer";
import Stat from "../../../lib/models/stat";
import Success from "../../../lib/models/Success";

class StatController extends BaseController
{
    protected _configRouter() {
        /**
         * POST: /api/stat/:status
         */
        this._router.get("/stat/:status", (req, res, next) => {
            this._logger.debug("StatController/stat/:status", this._name);
            //get params
            let status = req.params.status || 0;
            //do dal work
            db.insertStat(<Stat>{status: status, timestamp: new Date()})
                .then((r) => {
                    let result = <IServiceResult<Success>>{
                        result: new Success( (r.data || 0) > 0),
                        error: r.error
                    };
                    //return results via shared method
                    this.sendResult(result, req, res, next); 
                });    
        });
    }
}

export = new StatController();