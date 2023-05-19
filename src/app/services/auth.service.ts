import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { designation, employee, project, status } from '../type.model';
import { URL } from '../urls.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getEmployeesData() {
    return this.http.get(`${URL.employee}`);
  }

  updateEmployeesData(body: employee) {
    return this.http.post(`${URL.employee}`, body);
  }

  updateProjectsData(body: project) {
    return this.http.post(`${URL.project}`, body);
  }

  getProjectsData() {
    return this.http.get(`${URL.project}`);
  }
  updateProjectStatus(body: status, id: string) {
    return this.http.put(`${URL.project}/${id}/update_status`, body);
  }

  getDesignationData() {
    return this.http.get(`${URL.designation}`);
  }
}
