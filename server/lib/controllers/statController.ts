/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Stat controller to insert and retrieve stats
 */
import BaseController from "./baseController";
import * as db from "../datalayer";
import Stat from "../../../lib/models/stat";
import Success from "../../../lib/models/success";

class StatController extends BaseController
{
    protected _configRouter() {
        /**
         * POST: /api/stat/:status
         */
        this._router.post("/stat/:status", (req, res, next) => {
            this._insertStat(req, res, next);
        });

        /**
         * GET: /stat/last
         */
        this._router.get("/stat/last", (req, res, next) => {
            this._getTopStat(req, res, next);
        });

        //get a page of results
        this._router.get("/stats/:page", (req, res, next) => {
            this._getStats(req, res, next);
        });
    }

    /**
     * insert a single state record - expects req.params.status (0 for closed/1 for open)
     * 
     * @memberOf StatController
     */
    private _insertStat(req, res, next) {
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
    }

    /**
     * return the last inserted stat
     * 
     * @memberOf StatController
     */
    private _getTopStat(req, res, next) {
        this._logger.debug("StatController/stat/last", this._name);
        db.getLastStat()
        .then( (r) => {
            let result = <IServiceResult<Stat>>{
                result: r.data,
                error: r.error
            };
            //return results via shared method
            this.sendResult(result, req, res, next); 
        });
    }

    private _getStats(req, res, next) {
        this._logger.debug("StatController/stats/:page", this._name);
        //get params
        let page = req.params.page || 0;
        let pageSize = req.query.pageSize || 10;
        db.getStats(parseInt(page), parseInt(pageSize))
        .then( (r) => {
            let result = <IServiceResult<ICountResult<Stat[]>>>{
                result: r,
                error: r.error
            };
            //return results via shared method
            this.sendResult(result, req, res, next); 
        });
    }
}

export = new StatController();