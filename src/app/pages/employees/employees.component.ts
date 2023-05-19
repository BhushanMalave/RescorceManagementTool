import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Subscription } from 'rxjs';
import { employee, project } from 'src/app/type.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employeeName: string;
  employeeList: employee[] = [];
  employeeListSubject = new Subscription();
  filterlist: employee[] = [];
  employeeData: employee;
  employeeProjectList: string[] = [];
  projectlist: project[] = [];
  projectListSubject = new Subscription();
  showModel: boolean = false;

  constructor(
    public apiServices: AuthService,
    public employeeService: EmployeesService,
    public projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.getProjectList();
    this.getEmployeeList();
  }

  getProjectList() {
    this.projectService.getProjectList();
    this.projectListSubject = this.projectService.projectsList$.subscribe(
      (response) => {
        this.projectlist = response;
        this.getemployeeProjectList(this.employeeData);
      }
    );
  }

  getEmployeeList() {
    this.employeeService.getEmployeeList();
    this.employeeListSubject = this.employeeService.employeesList$.subscribe(
      (response) => {
        this.employeeList = response;
        this.filterlist = this.employeeList;
        if (localStorage.getItem('Employee')) {
          this.employeeData = JSON.parse(localStorage.getItem('Employee'));
        } else {
          this.employeeData = this.filterlist[0];
        }
      }
    );
  }
  onClickEmployee(data: any) {
    localStorage.removeItem('Employee');
    this.employeeData = data;
    this.getemployeeProjectList(data);
  }

  handleChange(event: string): void {
    this.filterlist = this.employeeList.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
  openDialog() {
    this.showModel = true;
  }
  closeDialog(event: any) {
    this.showModel = event.value;
  }
  updateEmployeeData(event: any) {
    this.showModel = event.value;
    this.getEmployeeList();
  }
  getemployeeProjectList(emp: employee) {
    this.employeeProjectList = [];
    this.projectlist.map((item) => {
      item.employees.map((data) => {
        if (data?.id === emp?.id) {
          this.employeeProjectList.push(item.name);
        }
      });
    });
  }
}
