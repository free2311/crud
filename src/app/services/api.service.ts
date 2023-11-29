import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// const token = JSON.parse(localStorage.getItem('token'));

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = "http://localhost:8000"
  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {

    return this.http.get<any>(`${this.url}/${path}`).pipe(map((d) => d));
  }

  post(path: string, data?: any): any {
    return this.http
      .post<any>(`${this.url}/${path}`, data)
      .pipe(map((d) => d));
  }


}
