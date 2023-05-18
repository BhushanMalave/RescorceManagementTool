import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { employee, project, status } from 'src/app/type.model';
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

  constructor(public apiServices: AuthService, public router: Router) {}

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
        this.projectlist = responseData;
        this.filterlist = this.projectlist;
        this.projectData = this.filterlist[0];
      },
      (error): void => {
        this.error.next(error.message);
      }
    );
    this.apiServices.getEmployeesData().subscribe(
      (responseData: employee[]) => {
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
    this.apiServices
      .updateProjectStatus(body, data.id)
      .subscribe((response) => {
        this.apiServices.getProjectsData().subscribe(
          (responseData: project[]) => {
            this.projectlist = responseData;
            this.filterlist = this.projectlist;
            this.filterlist.map((item) => {
              if (item.id === this.projectData.id) {
                this.projectData = item;
              }
            });
          },
          (error) => {
            this.error.next(error.message);
          }
        );
      });
  }
}
