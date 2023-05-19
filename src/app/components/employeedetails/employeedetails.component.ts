import { Component, Input } from '@angular/core';
import { employee } from 'src/app/type.model';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css'],
})
export class EmployeedetailsComponent {
  @Input() employeeData: employee;
  @Input() employeeProjectList: any = [];
}
