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
export function insertStat(stat: Stat): Promise<IResult<number>> {
    logger.debug("insertStat", "Datalayer");
    var dbCom = db.collection(statCol).insert(stat);
    return _parseResult<number, mongodb.InsertOneWriteOpResult>(dbCom, (result) => {
        return result.insertedCount;
    });
};

/**
 * Get the most recent stat from the collection
 * 
 * @export
 * @returns {Promise<IResult<Stat>>}
 */
export function getLastStat(): Promise<IResult<Stat>> {
    logger.debug("getLastStat", "Datalayer");
    var dbCom = db.collection(statCol).find({}).limit(1).sort({ timestamp: -1 }).toArray();
    return _parseResult<Stat, Stat[]>(dbCom, (result) => {
        return result ? result[0] : <Stat>{};
    });
};

/**
 * Get a page of stat results
 * 
 * @export
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<ICountResult<Stat[]>>}
 */
export function getStats(page: number, pageSize: number): Promise<ICountResult<Stat[]>> {
    logger.debug(`getStats page: ${page} pageSize: ${pageSize}`, "Datalayer");
    var dbCom = db.collection(statCol).find({});
    //build count result
    var res = <ICountResult<Stat[]>>{
        total: 0
    };
    //execute count and then query to get the page of results
    return dbCom.count(false)
        .then((result) => {
            //set count
            res.total = result;            
            if(result > 0) {
                //query for page results in order
                var pageCom = dbCom.sort({ timestamp: -1 }).skip(page * pageSize).limit(pageSize).toArray();
                return _parseAny<ICountResult<Stat[]>, Stat[], Stat[]>(pageCom, (result) => {
                    res.data = result;
                    return res;
                });
            } else {
                 return new Promise<ICountResult<Stat[]>>( (resolve) => { 
                    resolve(res);
                });
            }
        })
        .then( (result) => {
            return result;
        })
        .catch( (error) => {
            return <IResult<Stat[]>>{ error: error }; 
        });
};

/**
 * Helper to return a promise with an IResult of the request type against a mongo db promise
 * 
 * @template TResult - IResult data type
 * @template TDBResult - Mongo db promise value type (eg toArray = TResult[])
 * @param {Promise<any>} dbPromise - mongo db promise
 * @param {(value: TDBResult) => TResult} onResult - work with result value and return
 * @returns {Promise<IResult<TResult>>}
 */
function _parseResult<TResult, TDBResult>(dbPromise: Promise<any>, onResult: (value: TDBResult) => TResult) : Promise<IResult<TResult>> {
    var wrappedResult = (result: TDBResult) => {
        return <IResult<TResult>> { 
            data: onResult(result)
        };
    };
    return _parseAny<IResult<TResult>, TResult, TDBResult>(dbPromise, wrappedResult);
}

/**
 * Helper to return a promise with an IResultWrapper of the request type against a mongo db promise
 * 
 * @template IResultWrapper - IResult type - eg IResult<TResult> or ICountResult<TResult>
 * @template TResult - IResult data type
 * @template TDBResult - Mongo db promise value type (eg toArray = TResult[])
 * @param {Promise<any>} dbPromise - mongo db promise
 * @param {(value: TDBResult) => IResultWrapper} onResult - work with result value and result as IResultWrapper
 * @returns {Promise<IResultWrapper>}
 */
function _parseAny<IResultWrapper, TResult, TDBResult>(dbPromise: Promise<any>, onResult: (value: TDBResult) => IResultWrapper) : Promise<IResultWrapper> {
    return new Promise<IResultWrapper>((resolve, reject) => {
        dbPromise.then((value: TDBResult) => {
            resolve(onResult(value));
        })
        .catch((error) => {
            reject(<IResult<TResult>>{
                error: error
            });
        });
    });
};

/**
 * Function to close our db connection
 * 
 * @export
 * @returns {Promise<void>}
 */
export function close(): Promise<void> {
    return db.close();
};