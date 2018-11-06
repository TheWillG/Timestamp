import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Countdown, Reset } from '../../models/countdown.model';
import * as shortid from 'shortid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  themeSource: BehaviorSubject<string>;
  themeData: Observable<string>;
  countdownSource: BehaviorSubject<Countdown[]>;
  countdownData: Observable<Countdown[]>;

  constructor(private storage: Storage) {
    this.themeSource = new BehaviorSubject<string>('light');
    this.themeData = this.themeSource.asObservable();
    this.countdownSource = new BehaviorSubject<Countdown[]>([]);
    this.countdownData = this.countdownSource.asObservable();
    this.init();
  }

  async init() {
    const countdowns = await this.getCountdowns();
    if (!countdowns) {
      await this.setCountdowns([]);
    } else {
      const storedCountdowns = await this.getCountdowns();
      this.countdownSource.next(storedCountdowns);
    }
    this.setTheme(await this.getTheme());
  }

  async setTheme(theme: string) {
    await this.storage.set('theme', theme);
    this.themeSource.next(theme);
  }

  async getTheme(): Promise<string> {
    const theme = await this.storage.get('theme');
    this.themeSource.next(theme);
    return theme;
  }

  async addCountdown(countdown: Countdown) {
    const countdowns = await this.getCountdowns();
    countdown.id = shortid.generate();
    countdowns.push(countdown);
    this.setCountdowns(countdowns);
  }

  setCountdowns(countdowns: Countdown[]) {
    this.storage.set('countdowns', JSON.stringify(countdowns));
    this.countdownSource.next(countdowns);
  }

  async getCountdowns(): Promise<Countdown[]> {
    const countdowns: Countdown[] = JSON.parse(await this.storage.get('countdowns'));
    if (countdowns.length === 0) {
      return [];
    }
    countdowns.forEach(c => {
      c.dateTime = new Date(c.dateTime);
      c.resets.forEach(r => {
        r.startDate = r.startDate ? new Date(r.startDate) : null;
        r.endDate = r.endDate ? new Date(r.endDate) : null;
      });
    });
    return countdowns;
  }

  async getCountdown(id: string): Promise<Countdown> {
    const countdowns: Countdown[] = await this.getCountdowns();
    return countdowns.find(c => c.id === id);
  }

  async saveCountdown(countdown: Countdown): Promise<any> {
    const countdowns: Countdown[] = await this.getCountdowns();
    const updatedCountdowns = countdowns.map(c => c.id === countdown.id ? countdown : c);
    this.setCountdowns(updatedCountdowns);
    return;
  }

  async deleteCountdown(id: string): Promise<any> {
    const countdowns: Countdown[] = await this.getCountdowns();
    const newCountdowns = countdowns.filter(c => c.id !== id);
    this.setCountdowns(newCountdowns);
    return;
  }

  async resetCountdown(id: string, reset: Reset): Promise<any> {
    const countdowns: Countdown[] = await this.getCountdowns();
    const countdown = countdowns.find(c => c.id === id);
    countdown.dateTime = new Date();
    countdown.resets.push(reset);
    this.setCountdowns(countdowns);
    return;
  }
}
