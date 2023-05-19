import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { employee, project } from 'src/app/type.model';
import { ProjectsService } from 'src/app/services/projects.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projectData: project;
  projectName: string = '';
  projectlist: project[] = [];
  projectListSubject = new Subscription();
  employeeList: project[] = [];
  filterlist: project[] = [];
  employeeSelectedList: any = [];
  showModel: boolean = false;

  constructor(public router: Router, public projectService: ProjectsService) {}

  ngOnInit() {
    localStorage.removeItem('Employee');
    this.getProjectList();
  }

  getProjectList() {
    this.projectService.getProjectList();
    this.projectListSubject = this.projectService.projectsList$.subscribe(
      (response) => {
        this.projectlist = response;
        this.filterlist = this.projectlist;
        this.projectData = this.filterlist[0];
      }
    );
  }
  openDialog() {
    this.showModel = true;
  }
  closeDialog(event: any) {
    this.showModel = event.value;
  }
  updateProjectData(event: any) {
    this.showModel = event.value;
    this.getProjectList();
  }
  handleChange(event: string): void {
    this.filterlist = this.projectlist.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
  navigateToEmployee(emp: employee) {
    this.router.navigate(['/employees']);
    localStorage.setItem('Employee', JSON.stringify(emp));
  }

  updateStatus() {
    this.projectService.getProjectList();
    this.projectListSubject = this.projectService.projectsList$.subscribe(
      (response) => {
        this.projectlist = response;
        this.filterlist = this.projectlist;
        this.filterlist.map((item) => {
          if (item.id === this.projectData.id) {
            this.projectData = item;
          }
        });
      }
    );
  }
}
