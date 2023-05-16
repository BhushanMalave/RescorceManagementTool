import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employeeName: string;
  addNewEmployee!: FormGroup;
  employeeList: any = [];
  filterlist: any = [];
  employeeData: any;
  designations: any = [];
  showModel: boolean = false;
  error: any;
  constructor(
    public employeesService: EmployeesService,
    public apiServices: ApiService
  ) {}
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
    this.apiServices.getEmployeesData().subscribe((responseData) => {
      // console.log(responseData);
      this.employeeList = responseData;
      this.filterlist = this.employeeList;
      this.employeeData = this.filterlist[0];
    });
    this.apiServices.getDesignationData().subscribe((responseData) => {
      this.designations = responseData;
    });
  }

  onSubmit() {
    console.log(this.addNewEmployee.value);
    this.apiServices
      .postEmployeesData(this.addNewEmployee.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.addNewEmployee.reset();
    this.showModel = false;
    this.getData();
  }
  handleChange(event: string): void {
    // console.log(event);
    this.filterlist = this.employeeList.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
}
