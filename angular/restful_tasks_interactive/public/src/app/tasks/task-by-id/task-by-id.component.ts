import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-task-by-id',
  templateUrl: './task-by-id.component.html',
  styleUrls: ['./task-by-id.component.css']
})
export class TaskByIdComponent implements OnInit {
  taskById: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
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
