/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Stat instance
 */
import * as mongodb from "mongodb";

export default class Stat
{
     _id: mongodb.ObjectID;
     status: number;
     timestamp: Date
}

//status 0 is closed - 1 is opened