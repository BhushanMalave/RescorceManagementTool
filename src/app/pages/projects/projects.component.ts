import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { employee, project } from 'src/app/type.model';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projectData: project;
  projectName: string = '';
  projectlist: project[] = [];
  employeeList: project[] = [];
  filterlist: project[] = [];
  employeeSelectedList: any = [];
  dropdownList: employee[] = [];
  dropdownSettings: IDropdownSettings = {};
  addNewProject!: FormGroup;
  showModel: boolean = false;
  error = new Subject<string>();

  constructor(public apiServices: ApiService, public router: Router) {}

  ngOnInit() {
    localStorage.removeItem('Employee');
    this.getData();
    this.addNewProject = new FormGroup({
      name: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }

  getData() {
    this.apiServices.getProjectsData().subscribe(
      (responseData: project[]) => {
        // console.log(responseData);
        this.projectlist = responseData;
        this.filterlist = this.projectlist;
        this.projectData = this.filterlist[0];
      },
      (error) => {
        this.error.next(error.message);
      }
    );
    this.apiServices.getEmployeesData().subscribe(
      (responseData: employee[]) => {
        // console.log(responseData);
        this.dropdownList = responseData;
        this.dropdownSettings = {
          idField: 'id',
          textField: 'name',
        };
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  onCancle() {
    this.addNewProject.reset();
    this.showModel = false;
    this.getData();
  }
  onSubmit() {
    const object = {
      ...this.addNewProject.value,
      employees: this.employeeSelectedList,
    };
    // console.log('/////', object);
    this.apiServices.postProjectsData(object).subscribe(
      (response) => {
        console.log(response);
        this.addNewProject.reset();
        this.showModel = false;
        this.getData();
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  handleChange(event: string): void {
    // console.log(event);
    this.filterlist = this.projectlist.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
  employeeSelected(data: any) {
    this.employeeSelectedList.push(data.id);
  }
  employeeUnSelected(data: any) {
    var index = this.employeeSelectedList.indexOf(data.id);
    this.employeeSelectedList.splice(index, 1);
  }
  navigateToEmployee(emp: employee) {
    // console.log(emp);
    this.router.navigate(['/employees']);
    localStorage.setItem('Employee', JSON.stringify(emp));
  }

  updateStatus(data: project) {
    let body: { status: string };
    if (data.status == 'New') {
      body = {
        status: 'In Progress',
      };
    } else {
      body = {
        status: 'Closed',
      };
    }
    this.apiServices
      .updateProjectStatus(body, data.id)
      .subscribe((response) => {
        console.log(response);
        this.getData();
      });
  }
}
