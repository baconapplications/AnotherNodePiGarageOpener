/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 * 
 * Door service functions
 */
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Environment } from '../lib/environment'
import { ICountResult } from '../../../lib/models/ICountResult';
import Stat from '../../../lib/models/Stat';

@Injectable()
export class DoorService {
  // Observable sources
  private O_isDoorOpened = new BehaviorSubject<boolean>(false);

  // Observable streams
  public isDoorOpened$ = this.O_isDoorOpened.asObservable();

  private headers: Headers;

  constructor(private http: Http, private authService: AuthService) {

    this.headers = new Headers();
    //this.headers.append('AuthToken', this.authService.TODO);
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  //fire request to open/close door
  onButtonClick() {

    //TODO wait for the result and fire this with the actual door state
    this.O_isDoorOpened.next(!this.O_isDoorOpened.getValue());
  }

  
  /**
   * Return a page of history
   * 
   * @param {number} page 
   * @returns {Observable<ICountResult<Stat>>} 
   * 
   * @memberOf DoorService
   */
  getHistory(page: number, pageSize: number): Observable<ICountResult<Stat>> {
    let url = `${Environment.apiBase}/api/stats/${page}?pageSize=${pageSize}`;
    var response = this.http.get(url, { headers: this.headers })
      .map((res) => res.json());
    return response;
  }
}
