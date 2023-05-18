import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { employee, project, status } from '../type.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  error = new Subject<string>();
  url = 'https://pmt-service.onrender.com/api/';

  getEmployeesData() {
    return this.http.get(`${this.url}employees`);
  }

  postEmployeesData(body: employee) {
    return this.http.post(`${this.url}employees`, body);
  }

  postProjectsData(body: project) {
    return this.http.post(`${this.url}projects`, body);
  }

  getProjectsData() {
    return this.http.get(`${this.url}projects`);
  }
  updateProjectStatus(body: status, id: string) {
    return this.http.put(`${this.url}projects/${id}/update_status`, body);
  }

  getDesignationData() {
    return this.http.get(`${this.url}designations`);
  }
}
