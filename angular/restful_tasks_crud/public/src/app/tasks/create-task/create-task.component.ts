import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  newTask: any;
  @Output() myEvent = new EventEmitter();

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newTask = { title: "", description: "" }
  }

  onSubmit() {
    const observable = this._httpService.createTask(this.newTask);
    observable.subscribe(data => {
      this.myEvent.emit(null);
      this.newTask = { title: "", description: "" }
    });
  }
}
