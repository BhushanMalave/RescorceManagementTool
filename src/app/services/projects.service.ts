import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { project } from '../type.model';
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
}
