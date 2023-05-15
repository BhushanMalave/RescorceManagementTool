import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  toggle: boolean = false;
  signinForm!: FormGroup;
  constructor(public router: Router) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
        ]),
      }),
    });
  }

  onSubmit() {
    console.log(this.signinForm.value);
    this.signinForm.reset();
    this.router.navigate(['employees']);
  }
}
