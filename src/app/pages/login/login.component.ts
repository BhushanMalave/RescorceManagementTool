import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  toggle: boolean = false;
  signinForm!: FormGroup;
  errorStatus: boolean = false;
  constructor(public loginServices: LoginService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
        ]),
      }),
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.loginServices.userValidation(this.signinForm.value.userData);
      this.signinForm.reset();
      this.errorStatus = false;
    } else {
      this.errorStatus = true;
    }
  }
}
