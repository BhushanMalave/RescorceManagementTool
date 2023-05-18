import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee, project, status } from '../type.model';
import { URL } from '../urls.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getEmployeesData() {
    return this.http.get(`${URL.employee}`);
  }

  postEmployeesData(body: employee) {
    return this.http.post(`${URL.employee}`, body);
  }

  postProjectsData(body: project) {
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
