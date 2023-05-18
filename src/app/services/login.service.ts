import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from './timer.service';
import { userdetails } from '../type.model';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: userdetails[] = [];
  status: boolean = false;

  constructor(public router: Router, public timer: TimerService) {
    localStorage.setItem('Authorization', JSON.stringify(false));
  }

  userValidation(data: userdetails) {
    this.userData = JSON.parse(localStorage.getItem('usersDetails'));

    if (this.userData) {
      this.userData.map((value) => {
        if (value.email == data.email) {
          console.log('email exists');
          if (data.password == value.password) {
            console.log('correct password');
            this.login();
            this.status = true;
            // alert('User Loged In Successfully');
          } else {
            console.log('wrong password');
            this.status = true;
            alert('Please Enter Correct Password');
          }
        }
      });
      if (!this.status) {
        console.log('email not exist');
        this.userData.push(data);
        this.login();
        // alert('User Registered Successfully');
      }
    } else {
      console.log('data not exist');
      this.userData = [];
      this.userData.push(data);
      this.login();
    }
  }

  login() {
    localStorage.setItem('Authorization', JSON.stringify(true));
    localStorage.setItem('usersDetails', JSON.stringify(this.userData));
    this.router.navigate(['employees']);
    this.timer.autoLogout();
  }
}
