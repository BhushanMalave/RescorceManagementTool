import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employeeName: string = '';
  addNewEmployee!: FormGroup;
  emplist: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  deg = ['a', 'b', 'c'];
  showModel: boolean = true;
  ngOnInit() {
    this.addNewEmployee = new FormGroup({
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    console.log(this.addNewEmployee.value);
    this.addNewEmployee.reset();
    this.showModel = false;
  }
  handleChange(event: string): void {
    console.log(event);
  }
}
