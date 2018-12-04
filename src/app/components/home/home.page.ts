import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Countdown } from '../../models/countdown.model';
import { CountdownService } from '../../services/countdown/countdown.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  theme: string;
  countdowns: Countdown[];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private countdownService: CountdownService
  ) {}

  async ngOnInit() {
    const theme = await this.storageService.getTheme();
    if (theme) {
      this.theme = theme;
    } else {
      this.theme = 'light';
      this.storageService.setTheme(this.theme);
    }
    this.countdowns = await this.storageService.getCountdowns();
    this.storageService.themeData.subscribe(value => (this.theme = value));
    this.storageService.countdownData.subscribe(value => {
      this.countdowns = value;
      this.countdowns.forEach(countdown => {
        const { days, past } = this.countdownService.getDaysSince(countdown.dateTime);
        countdown.daysRemaining = days;
        countdown.past = past;
      });
    });
  }

  add() {
    this.router.navigate(['add']);
  }

  viewCountdown(countdown: Countdown) {
    this.router.navigate(['/', 'countdown', countdown.id]);
  }

  async changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.storageService.setTheme(this.theme);
  }
}
