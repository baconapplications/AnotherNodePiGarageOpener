/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Base logger for Express
 */

import * as express from "express";
import * as moment from "moment";
import * as winston from "winston";
import * as morgan from "morgan";

class ExpressLogger {
    private source: string;
    private wLog: winston.LoggerInstance;

    /**
     * init our log helper
     * pass in source - eg api or web
     */
    init(source: string) {
        this.source = source;

        //define our custom levels - used so we can parse logs with custom filters
        var myCustomLevels = {
            levels: {
                hit: 0,
                error: 1,
                info: 2,
                debug: 3
            },
            colors: {
                hit: 'blue',
                error: 'red',
                info: 'green',
                debug: 'yellow'
            }
        };

        this.wLog = new winston.Logger({
            transports: [
                // new winston.transports.File({
                //     level:            'info',
                //     filename:         './logs/all-logs.log',
                //     handleExceptions: true,
                //     json:             true,
                //     maxsize:          5242880, //5MB
                //     maxFiles:         5,
                //     colorize:         false
                // }), 
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })
            ],
            levels: myCustomLevels.levels,
            exitOnError: false
        });
        winston.addColors(myCustomLevels.colors);

        //set up log stream to log as info
        this.wLog.stream = <any>{};
        (<any>this.wLog.stream).write = (message, encoding) => {
            this.wLog.log("hit", message);
        }
    }

    /**
     * return the winston stream so express can attach
     * 
     * @returns
     * 
     * @memberOf ExpressLogger
     */
    getStream() {
        return this.wLog.stream;
    }

    /**
     * info level log
     * 
     * @param {string} message - log message
     * @param {string} component - component that is calling log - eg class.method
     * @param {Object} [additional] - additional object of any log data you want to log
     * 
     * @memberOf ExpressLogger
     */
    info(message: string, component: string, additional?: Object) {
        this.detailLog("info", message, this.source, component, additional);
    }

    /**
     * debug level log
     * 
     * @param {string} message - log message
     * @param {string} component - component that is calling log - eg class.method
     * @param {Object} [additional] - additional object of any log data you want to log
     * 
     * @memberOf ExpressLogger
     */
    debug(message: string, component: string, additional?: Object) {
        this.detailLog("debug", message, this.source, component, additional);
    }

    /**
     * error level log
     * 
     * @param {string} message - log message
     * @param {string} component - component that is calling log - eg class.method
     * @param {Object} [additional] - additional object of any log data you want to log
     * 
     * @memberOf ExpressLogger
     */
    error(message: string, component: string, additional?: Object) {
        this.detailLog("error", message, this.source, component, additional);
    }

    /**
     * detailLog log any type you want
     * 
     * @param {string} type - type of log event eg info, debug, error
     * @param {string} message - log message
     * @param {string} source - log source eg web or api
     * @param {string} component - component that is calling log - eg class.method
     * @param {Object} [meta] - additional object of any log data you want to log
     * 
     * @memberOf ExpressLogger
     */
    detailLog(type: string, message: string, source: string, component: string, meta?: Object) {
        if (!meta)
            meta = {};
        meta["LOG_component"] = component;
        meta["LOG_source"] = source;
        meta["LOG_stamp"] = moment().format("h:mm:ss:SSSS A");
        this.wLog.log(type, message, meta);
    }
}

var logger = new ExpressLogger();
logger.init("api");

export default logger;

export function attachExpressLog(app: express.Application) {
    app.use(morgan(<any>'{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', { stream: <any>logger.getStream() }));
}