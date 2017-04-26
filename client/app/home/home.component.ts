import { Component } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  public isOpen: boolean = true;
  public historyLoaded: boolean = true;
  public loadingHistory: boolean = false;

  buttonText() {
    return this.isOpen ? "Close Door" : "Open Door";
  }
}