import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DoorService {
  // Observable sources
  private O_isDoorOpened = new BehaviorSubject<boolean>(false);
  
  // Observable streams
  public isDoorOpened$ = this.O_isDoorOpened.asObservable();

  constructor() { }

  //fire request to open/close door
  onButtonClick() {

    //TODO wait for the result and fire this with the actual door state
    this.O_isDoorOpened.next(!this.O_isDoorOpened.getValue());
  }

  getHistory(page: number) {
    //TODO wire to API to get current page
  }
}
