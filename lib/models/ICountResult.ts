/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * count result for api
 */
export interface ICountResult<T> {
    total: number;
    data: T[];
}