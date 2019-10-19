import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getTasks(){
    return this._http.get("/tasks");
  }

  getTaskById(){
    let params = new HttpParams().set('_id', "5dab75e5aff831b116cbe229");

    return this._http.get("/task", {params: params});
  }
}
