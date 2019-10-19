import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getTasks();
    this.getTaskById();
  }

  getTasks(){
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get("/tasks");
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got our tasks!", data));
  }

  getTaskById(){
    let params = new HttpParams().set('_id', "5da62627a7d9e027d5b0c578");

    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get("/task", {params: params});
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got our task by !", data));
  }
}
