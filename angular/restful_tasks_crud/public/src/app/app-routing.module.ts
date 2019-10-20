import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
