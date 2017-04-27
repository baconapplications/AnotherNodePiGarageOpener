/**
 * Copyright (c) Randy Bacon. All rights reserved.  
 * Licensed under the MIT License. See LICENSE file in the project root for full license information. 
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DoorService } from './services/door.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['app.scss', 'app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  public isOpen: boolean = true;

  constructor(private doorService: DoorService) {
  }

  ngOnInit(): void {
    this.doorService.isDoorOpened$.subscribe(isDoorOpened => {
      this.isOpen = isDoorOpened;
    });
  }
}