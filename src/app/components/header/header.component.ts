import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  active: string = 'active';
  constructor(public router: Router) {}
  ngOnInit() {}
  onclicklogout() {
    this.router.navigate(['']);
    localStorage.setItem('Authorization', JSON.stringify(false));
    localStorage.removeItem('Employee');
  }
}
