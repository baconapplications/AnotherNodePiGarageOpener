import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['app.scss', 'app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  public isOpen: boolean = true;
}