import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: any = [];
  taskToShow: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {

      this.tasks = data;
    });
  }

  showTask(task) {
    this.taskToShow = task;
  }
}
