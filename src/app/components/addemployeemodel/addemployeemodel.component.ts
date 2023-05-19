import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { designation } from 'src/app/type.model';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
@Component({
  selector: 'app-addemployeemodel',
  templateUrl: './addemployeemodel.component.html',
  styleUrls: ['./addemployeemodel.component.css'],
})
export class AddemployeemodelComponent implements OnInit {
  addNewEmployeeForm!: FormGroup;

  designations: designation[];
  designationsSubject = new Subscription();
  @Input() showModel: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<boolean>();

  constructor(
    public apiServices: AuthService,
    public employeeService: EmployeesService
  ) {}
  ngOnInit() {
    this.getDegnisationList();
    this.addNewEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }
  getDegnisationList() {
    this.employeeService.getDesignationList();
    this.designationsSubject = this.employeeService.designationList$.subscribe(
      (response) => {
        this.designations = response;
      }
    );
  }
  onCancle(): void {
    this.addNewEmployeeForm.reset();
    this.close.emit(false);
  }

  onSubmit() {
    this.employeeService.UpdateEmployeeList(this.addNewEmployeeForm.value);
    this.addNewEmployeeForm.reset();
    this.save.emit(false);
  }
}
