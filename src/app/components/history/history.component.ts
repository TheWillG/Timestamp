import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Countdown, Reset } from '../../models/countdown.model';
import { CountdownService } from '../../services/countdown/countdown.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  theme: string;
  countdownId: string;
  countdown: Countdown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private countdownService: CountdownService) { }

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.storageService.themeData.subscribe(value => this.theme = value);
    this.countdownId = this.route.snapshot.params.id;
    this.countdown = await this.storageService.getCountdown(this.countdownId);
    console.log('this.countdown', this.countdown);
    this.storageService.countdownData.subscribe(countdowns => {
      this.countdown = countdowns.find(c => c.id === this.countdownId);
    });
  }

  getDaysHoursMinutes(reset: Reset) {
    const timeBetweenResets = this.countdownService.getDaysHoursMinutesBetween(reset.startDate, reset.endDate);
    return `${timeBetweenResets.days} Days, ${timeBetweenResets.hours} Hours, ${timeBetweenResets.minutes} Minutes`;
  }

  back() {
    this.router.navigate(['countdown', this.countdownId]);
  }

}
