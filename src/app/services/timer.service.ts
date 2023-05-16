import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor(public router: Router, private ngZone: NgZone) {}

  autoLogout() {
    this.lastAction(Date.now());
    this.initInterval();
  }
  getLastAction() {
    return localStorage.getItem('lastAction');
  }
  lastAction(value: any) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        if (localStorage.getItem('Authorization') === 'true') {
          this.check();
        }
      }, 1000);
    });
  }

  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + 5 * 60 * 1000;
    const diff = timeLeft - now;
    // console.log(diff);
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && localStorage.getItem('Authorization') === 'true') {
        localStorage.removeItem('lastAction');
        setTimeout(() => {
          console.log(
            'Your Session Expired due to longer Inactivity, Login Again To Continue'
          );
        }, 1000);
        localStorage.setItem('Authorization', JSON.stringify(false));
        this.router.navigate(['']);
      }
    });
  }
}
