import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Countdown, Reset } from '../../models/countdown.model';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.scss']
})
export class ResetConfirmComponent implements OnInit {
  theme: string;
  reason: string;
  countdownId: string;
  countdown: Countdown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.storageService.themeData.subscribe(value => (this.theme = value));
    this.countdownId = this.route.snapshot.params.id;
    this.countdown = await this.storageService.getCountdown(this.countdownId);
  }

  async reset() {
    const reset = new Reset({ id: this.countdownId, reason: this.reason, startDate: this.countdown.dateTime, endDate: new Date() });
    await this.storageService.resetCountdown(this.countdownId, reset);
    this.back();
  }

  back() {
    this.router.navigate(['countdown', this.countdownId]);
  }
}
