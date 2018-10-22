import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Countdown } from '../../models/countdown.model';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  theme: string;
  countdownId: string;
  countdown: Countdown;

  constructor(private router: Router, private storageService: StorageService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    this.countdownId = this.route.snapshot.params.id;
    this.countdown = await this.storageService.getCountdown(this.countdownId);
  }

  back() {
    this.router.navigate(['home']);
  }

  async delete() {
    await this.storageService.deleteCountdown(this.countdownId);
    this.router.navigate(['home']);
  }

}
