/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * interface additions for express TS objects
 */
interface IStatusError extends Error {
    status: number;
};