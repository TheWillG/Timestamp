import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Countdown } from '../../models/countdown.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  theme: string;
  date: any = null;
  description = '';
  countdown: Countdown;
  countdownId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
    ) {
   }

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.storageService.themeData.subscribe(value => this.theme = value);
    this.countdownId = this.route.snapshot.params.id;
    this.countdown = await this.storageService.getCountdown(this.countdownId);
    this.date = this.countdown.dateTime.toISOString();
    this.description = this.countdown.description;
  }

  back() {
    this.router.navigate(['countdown', this.countdownId]);
  }

  save() {
    let date;
    if (typeof this.date === 'string') {
      date = new Date(this.date);
    } else {
      date = new Date();
      date.setFullYear(this.date.year.value);
      date.setMonth(this.date.month.value - 1);
      date.setDate(this.date.day.value);
    }
    this.countdown = new Countdown({ dateTime: date, description: this.description, id: this.countdownId });
    this.storageService.saveCountdown(this.countdown);
    this.router.navigate(['countdown', this.countdownId]);
  }

}
