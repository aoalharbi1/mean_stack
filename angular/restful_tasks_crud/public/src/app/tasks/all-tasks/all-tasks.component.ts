import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: any = [];
  selectedTask: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getTasksFromService();
    this.selectedTask = { title: "", description: "" };
  }

  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      this.tasks = data;
    });
  }

  delete(task) {
    const observable = this._httpService.deleteTask(task);
    observable.subscribe(data => {
      this.getTasksFromService();
      this.tasks = data;
    });
  }

  showTaskToEdit(task){
    this.selectedTask = task;
  }

  edit(task){

    const observable = this._httpService.editTask(task);
    observable.subscribe(data => {
      
      this.getTasksFromService();
      this.tasks = data;
      this.selectedTask = { title: "", description: "" };
    });
  }
}
