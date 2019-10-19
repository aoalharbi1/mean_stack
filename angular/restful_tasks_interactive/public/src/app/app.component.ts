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
  taskToShow: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() { }

  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {

      this.tasks = data;
    });
  }

  showTask(task) {
    this.taskToShow = task;
  }

  getTaskByIdFromService(task: HTMLInputElement, event) {
    if (event.keyCode !== 13) {
      return;
    }

    const id = task.value;
    const observable = this._httpService.getTaskById(id);
    observable.subscribe(data => {
      this.taskById = data;
    });
  }
}
