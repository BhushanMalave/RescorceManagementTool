import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from './timer.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: { email: string; password: string }[] = [];

  constructor(public router: Router, public timer: TimerService) {}

  userValidation(data: { email: string; password: string }) {
    // console.log(data);
    this.userData = JSON.parse(localStorage.getItem('usersDetails'));
    // console.log(this.userData);
    if (this.userData) {
      const item: { email: string; password: string }[] = this.userData.map(
        (value) => value
      );
      if (item[0].email == data.email) {
        console.log('email exists');
        if (data.password == item[0].password) {
          console.log('correct password');
          this.login();
        } else {
          console.log('wrong password');
        }
      } else {
        console.log('email not exist');
        this.userData.push(data);
        this.login();
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
