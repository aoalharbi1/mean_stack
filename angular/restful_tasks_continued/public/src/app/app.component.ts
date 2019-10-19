import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any = [];
  taskById: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getTasksFromService();
    this.getTaskByIdFromService();
  }
  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {

      this.tasks = data;
    });
  }

  getTaskByIdFromService(){
    const observable = this._httpService.getTaskById();
    observable.subscribe(data => {

      this.taskById = data;
    });
  }
}
