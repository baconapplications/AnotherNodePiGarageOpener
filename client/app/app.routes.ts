import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCheck } from './lib/authcheck';
import { AuthService } from "./services/auth.service";

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthCheck,
    AuthService
  ]
})

export class AppRoutingModule { }