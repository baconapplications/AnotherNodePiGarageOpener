import { Component, OnInit} from '@angular/core';
import{ DoorService } from '../services/door.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public historyLoaded: boolean = true;
  public loadingHistory: boolean = false;
  public buttonText: string = "Loading...";

  constructor(private doorService: DoorService)  { }

  ngOnInit(): void {
    this.doorService.isDoorOpened$.subscribe(isDoorOpened => {
      this.buttonText = isDoorOpened ? "Close Door" : "Open Door";
      //enable button?
    });
  }

  doorClick() {
    //disable button?
    this.doorService.onButtonClick();
    //wait for promise and set timer of like 30 seconds?  if button still disabled then alert?
  }

  nextPage(){
    this.loadingHistory = true;
  }
}