import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  theme = 'light';
  constructor(private router: Router) {}

  add() {
    this.router.navigate(['add']);
  }

  changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
