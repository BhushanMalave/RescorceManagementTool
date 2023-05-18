import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { designation, employee, project } from 'src/app/type.model';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employeeName: string;
  addNewEmployee!: FormGroup;
  employeeList: employee[] = [];
  filterlist: employee[] = [];
  employeeData: employee;
  designations: designation[] = [];
  employeeProjectList: any = [];
  projectlist: project[] = [];
  showModel: boolean = false;
  error = new Subject<string>();
  constructor(public apiServices: AuthService) {}
  ngOnInit() {
    this.getData();
    this.addNewEmployee = new FormGroup({
      name: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }

  getData() {
    this.apiServices.getEmployeesData().subscribe(
      (responseData: employee[]) => {
        this.employeeList = responseData;
        this.filterlist = this.employeeList;

        if (localStorage.getItem('Employee')) {
          this.employeeData = JSON.parse(localStorage.getItem('Employee'));
        } else {
          this.employeeData = this.filterlist[0];
        }
      },
      (error) => {
        this.error.next(error.message);
      }
    );
    this.apiServices.getProjectsData().subscribe(
      (responseData: project[]) => {
        this.projectlist = responseData;
        this.getemployeeProject(this.employeeData);
      },
      (error) => {
        this.error.next(error.message);
      }
    );
    this.apiServices.getDesignationData().subscribe(
      (responseData: designation[]) => {
        this.designations = responseData;
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  onClickEmployee(data: any) {
    localStorage.removeItem('Employee');
    this.employeeData = data;
    this.getemployeeProject(data);
  }
  onCancle() {
    this.addNewEmployee.reset();
    this.showModel = false;
    this.getData();
  }
  onSubmit() {
    console.log(this.addNewEmployee.value);
    this.apiServices.postEmployeesData(this.addNewEmployee.value).subscribe(
      (response) => {
        this.addNewEmployee.reset();
        this.showModel = false;
        this.getData();
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  handleChange(event: string): void {
    this.filterlist = this.employeeList.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
  getemployeeProject(emp: employee) {
    this.employeeProjectList = [];
    this.projectlist.map((item) => {
      item.employees.map((data) => {
        if (data.id === emp.id) {
          this.employeeProjectList.push(item.name);
        }
      });
    });
  }
}
