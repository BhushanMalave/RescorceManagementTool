import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { project, status } from '../type.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsListSubject: BehaviorSubject<project[]> = new BehaviorSubject<
    project[]
  >([]);
  projectsList$: Observable<project[]> =
    this.projectsListSubject.asObservable();

  constructor(public apiServices: AuthService) {}

  getProjectList(): void {
    this.apiServices.getProjectsData().subscribe({
      next: (responseData: project[]) => {
        this.projectsListSubject.next(responseData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProjectStatus(body: status, id: string) {
    this.apiServices.updateProjectStatus(body, id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProjectList(body: project): void {
    this.apiServices.updateProjectsData(body).subscribe({
      next: (responseData) => {
        console.log(responseData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
