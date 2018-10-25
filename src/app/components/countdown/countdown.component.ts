import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Countdown } from '../../models/countdown.model';
import { CountdownService } from '../../services/countdown/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  theme: string;
  countdownId: string;
  countdown: Countdown;
  days: number;
  hours: number;
  minutes: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private countdownService: CountdownService
  ) {}

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.storageService.themeData.subscribe(value => this.theme = value);
    this.countdownId = this.route.snapshot.params.id;
    this.countdown = await this.storageService.getCountdown(this.countdownId);
    const { days, hours, minutes } = this.countdownService.getDaysHoursMinutesSince(this.countdown.dateTime);
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.storageService.countdownData.subscribe(countdowns => {
      this.countdown = countdowns.find(c => c.id === this.countdownId);
    });
  }

  back() {
    this.router.navigate(['home']);
  }

  edit() {
    this.router.navigate(['edit', this.countdown.id]);
  }

  async delete() {
    await this.storageService.deleteCountdown(this.countdownId);
    this.router.navigate(['home']);
  }

  reset() {
    this.router.navigate(['reset', this.countdownId]);
  }

  history() {
    this.router.navigate(['history', this.countdownId]);
  }
}
