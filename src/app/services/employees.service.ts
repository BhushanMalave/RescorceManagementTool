import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { designation, employee } from '../type.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  designationsListSubject: BehaviorSubject<designation[]> = new BehaviorSubject<
    designation[]
  >([]);
  designationList$: Observable<designation[]> =
    this.designationsListSubject.asObservable();

  employeesListSubject: BehaviorSubject<employee[]> = new BehaviorSubject<
    employee[]
  >([]);
  employeesList$: Observable<employee[]> =
    this.employeesListSubject.asObservable();

  constructor(public apiServices: AuthService) {}

  getDesignationList(): void {
    if (this.designationsListSubject.value.length === 0) {
      this.apiServices.getDesignationData().subscribe({
        next: (responseData: designation[]) => {
          this.designationsListSubject.next(responseData);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getEmployeeList(): any {
    if (this.employeesListSubject.value.length === 0) {
      this.apiServices.getEmployeesData().subscribe({
        next: (responseData: employee[]) => {
          this.employeesListSubject.next(responseData);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
