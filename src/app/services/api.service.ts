import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  error = new Subject<string>();

  getEmployeesData() {
    return this.http.get(
      'https://pmt-service.onrender.com/api/employees',

      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }

  postEmployeesData(body) {
    return this.http.post(
      'https://pmt-service.onrender.com/api/employees',
      body,
      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }

  postProjectsData(body) {
    return this.http.post(
      'https://pmt-service.onrender.com/api/projects',
      body,
      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }

  getProjectsData() {
    return this.http.get(
      'https://pmt-service.onrender.com/api/projects',

      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }
  updateProjectStatus(body, id) {
    console.log(body, id);
    return this.http.put(
      `https://pmt-service.onrender.com/api/projects/${id}/update_status`,
      body,
      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }

  getDesignationData() {
    return this.http.get(
      'https://pmt-service.onrender.com/api/designations',

      {
        headers: { 'x-api-key': 'secrt-dev-1505' },
      }
    );
  }
}
