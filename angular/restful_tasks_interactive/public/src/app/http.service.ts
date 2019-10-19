import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  getTasks() {
    return this._http.get("/tasks");
  }

  getTaskById(id) {
    let params = new HttpParams().set('_id', id);

    return this._http.get("/task", { params: params });
  }
}
