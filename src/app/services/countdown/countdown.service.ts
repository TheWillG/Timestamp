import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  getDaysSince(date: Date): number {
    return Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000 / 86400);
  }

  getDaysHoursMinutesSince(date: Date): any {
    let delta = Math.abs(date.getTime() - new Date().getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;

    return {days, hours, minutes};
  }

  getDaysHoursMinutesBetween(start: Date, end: Date) {
    let delta = Math.abs(start.getTime() - end.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;

    return {days, hours, minutes};
  }
}
