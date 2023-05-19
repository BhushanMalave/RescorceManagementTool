import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { employee } from 'src/app/type.model';

@Component({
  selector: 'app-addprojectmodel',
  templateUrl: './addprojectmodel.component.html',
  styleUrls: ['./addprojectmodel.component.css'],
})
export class AddprojectmodelComponent {
  dropdownList: employee[] = [];
  employeeSelectedList: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownListSubject = new Subscription();
  addNewProjectForm!: FormGroup;

  @Input() showModel: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<boolean>();

  constructor(
    public employeeService: EmployeesService,
    public projectService: ProjectsService,
    public router: Router
  ) {}
  ngOnInit() {
    this.getEmployeeList();
    this.addNewProjectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }
  getEmployeeList() {
    this.employeeService.getEmployeeList();
    this.dropdownListSubject = this.employeeService.employeesList$.subscribe(
      (response) => {
        this.dropdownList = response;
        this.dropdownSettings = {
          idField: 'id',
          textField: 'name',
        };
      }
    );
  }
  onCancle() {
    this.addNewProjectForm.reset();
    this.close.emit(false);
  }
  employeeSelected(data: any) {
    this.employeeSelectedList.push(data.id);
  }
  employeeUnSelected(data: any) {
    var index = this.employeeSelectedList.indexOf(data.id);
    this.employeeSelectedList.splice(index, 1);
  }

  onSubmit() {
    const object = {
      ...this.addNewProjectForm.value,
      employees: this.employeeSelectedList,
    };
    this.projectService.updateProjectList(object);
    this.addNewProjectForm.reset();
    this.save.emit(false);
  }
}
