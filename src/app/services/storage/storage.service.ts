import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Countdown } from '../../models/countdown.model';
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
  }

  setTheme(theme: string) {
    this.storage.set('theme', theme);
    this.themeSource.next(theme);
  }

  async getTheme(): Promise<string> {
    return this.storage.get('theme');
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
    return JSON.parse(await this.storage.get('countdowns'));
  }

  async getCountdown(id: string): Promise<Countdown> {
    const countdowns: Countdown[] = await this.getCountdowns();
    return countdowns.find(c => c.id === id);
  }

  async deleteCountdown(id: string): Promise<any> {
    const countdowns: Countdown[] = await this.getCountdowns();
    const newCountdowns = countdowns.filter(c => c.id !== id);
    this.setCountdowns(newCountdowns);
    return;
  }
}
