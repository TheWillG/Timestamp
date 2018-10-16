import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  theme: string;
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    const theme = await this.storageService.getTheme();
    if (theme) {
      this.theme = theme;
    } else {
      this.theme = 'light';
      this.storageService.setTheme(this.theme);
    }
    this.storageService.themeData.subscribe(value => this.theme = value);
  }

  add() {
    this.router.navigate(['add']);
  }

  async changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.storageService.setTheme(this.theme);
  }
}
