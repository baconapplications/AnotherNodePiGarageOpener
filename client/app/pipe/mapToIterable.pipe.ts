/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 */

// helper to map a dict to iterable - http://stackoverflow.com/questions/31490713/iterate-over-typescript-dictionary-in-angular-2
import { Pipe } from '@angular/core';

@Pipe({
  name: 'mapToIterable'
})

export class MapToIterable {
  transform(dict: Object): Array<Object>{
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}