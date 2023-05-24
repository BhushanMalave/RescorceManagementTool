import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { employee, project, status } from 'src/app/type.model';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css'],
})
export class ProjectdetailsComponent {
  @Input() projectData: project;
  @Output() update = new EventEmitter<boolean>();
  constructor(
    public router: Router,
    public projectService: ProjectsService,
    public apiServices: AuthService
  ) {}

  navigateToEmployee(emp: employee) {
    this.router.navigate(['/employees']);
    localStorage.setItem('Employee', JSON.stringify(emp));
  }
  updateStatus(data: project) {
    let body: status;
    if (data.status == 'New') {
      body = {
        status: 'In Progress',
      };
    } else {
      body = {
        status: 'Closed',
      };
    }
    this.apiServices.updateProjectStatus(body, data.id).subscribe({
      next: (response) => {
        console.log(response);
        this.projectService.projectsListSubject.next([]);
        this.update.emit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
