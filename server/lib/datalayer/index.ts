/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Datalayer for mongo access
 */
import * as config from "./config";
import * as mongodb from "mongodb";
import logger from "../util/logger";
import Stat from "../../../lib/models/stat";

//create our db conneciton - assume first hit won't happen while db loading
var statCol = "doorstats";
var db: mongodb.Db;
var client = new mongodb.MongoClient();
client.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.server}:${config.port}/${config.db}`,
    <mongodb.MongoClientOptions>{
        server: {
            socketOptions: {
                autoReconnect: true
            }
        }
    },
    (error, dbInstance) => {
        if (error)
            throw error;
        logger.debug("DB connected", "Datalayer");
        db = dbInstance;
    });


/**
 * function to insert a stat hit
 * 
 * @export
 * @param {Stat} stat
 * @returns {Promise<IResult<number>>}
 */
export function insertStat(stat: Stat) : Promise<IResult<number>> {
    return new Promise<IResult<number>>( (resolve, reject) => {
        db.collection(statCol).insert(stat)
        .then( (value) => {
            resolve(<IResult<number>>{
                data: value.insertedCount
            });
        })
        .catch( (error) => {
            reject(<IResult<number>>{
                error: error
            });
        });
    });
}

//TODO get top 1 stat - returns promise of single Datalayer result
//db.collection("test").findOne({})

//TODO return list of stats paging with order

/**
 * Function to close our db connection
 * 
 * @export
 * @returns {Promise<void>}
 */
export function close() : Promise<void> {
    return db.close();
};