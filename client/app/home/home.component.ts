/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 */
import { Component, OnInit} from '@angular/core';
import{ DoorService } from '../services/door.service';
import { ICountResult } from '../../../lib/models/ICountResult';
import Stat from '../../../lib/models/Stat';
import * as Moment from "moment";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public historyLoaded: boolean = false;
  public loadingHistory: boolean = false;
  public buttonText: string = "Loading...";
  public history: Stat[] = [];
  public page: number = 0;
  public pageSize: number = 10;
  public totalPages: number = 0;

  constructor(private doorService: DoorService)  { }

  ngOnInit(): void {
    this.doorService.isDoorOpened$.subscribe(isDoorOpened => {
      this.buttonText = isDoorOpened ? "Close Door" : "Open Door";
    });
  }

  doorClick() {
    //disable button?
    this.doorService.onButtonClick();
    //wait for promise and set timer of like 30 seconds?  if button still disabled then alert?
  }

  loadHistory() {
    this.loadingHistory = true;
    this.doorService.getHistory(this.page, this.pageSize).subscribe(r => {
      this.history = r.data;
      this.totalPages = Math.ceil(r.total / this.pageSize);
      this.historyLoaded = true;
      this.loadingHistory = false;
    });
  }

  nextPage(){
    this.page++
    this.loadHistory();
  }

  prevPage() {
    this.page--;
    this.loadHistory();
  }
}