
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app.routes";
import { AppComponent } from './app.component';
//filters
import { MapToIterable } from './pipe/MapToIterable.pipe';
//services

//ng modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MaterialModule}  from '@angular/material';
//TODO do i need this?
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

//components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule, 
    MaterialModule.forRoot()
  ],
  providers: [
    //GithubService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
