import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { TaskByIdComponent } from './tasks/task-by-id/task-by-id.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTasksComponent,
    TaskByIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
