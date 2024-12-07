import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getChart1Data(): Observable<any> {
    return this.http.get('http://localhost:3000/api/chart1');
  }

  getChart2Data(): Observable<any> {
    return this.http.get('http://localhost:3000/api/chart2');
  }
}
