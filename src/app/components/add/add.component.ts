import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Countdown } from '../../models/countdown.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  private theme: string;
  private date: any = null;
  private description = '';
  private countdown: Countdown;

  constructor(private router: Router, private storageService: StorageService) {
   }

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.storageService.themeData.subscribe(value => this.theme = value);
  }

  back() {
    this.router.navigate(['home']);
  }

  save() {
    const date: Date = new Date();
    date.setFullYear(this.date.year.value);
    date.setMonth(this.date.month.value - 1);
    date.setDate(this.date.day.value);
    this.countdown = { datetime: date, description: this.description};
    this.storageService.addCountdown(this.countdown);
    this.router.navigate(['']);
  }

}
