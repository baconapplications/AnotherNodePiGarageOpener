/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Datalayer for mongo access
 */
import * as config from "./config";
import * as mongodb from "mongodb";
import logger from "../util/logger";

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

//TODO insert stat - do you need to create index?  what about id?

//TODO get top 1 stat - returns promise of single Datalayer result
//db.collection("test").findOne({})

//TODO return list of stats paging with order

export function close() {
    db.close(true, () => {
        logger.debug("Closing db", "Datalayer");
    });
};