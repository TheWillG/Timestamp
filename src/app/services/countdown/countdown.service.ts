import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  getDaysSince(date: Date): any {
    let days = Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000 / 86400);
    const past = Math.sign(days) === -1;
    days = Math.abs(days);
    return { days, past };
  }

  getDaysHoursMinutesSince(date: Date): any {
    let delta = (date.getTime() - new Date().getTime()) / 1000;
    const past = Math.sign(delta) === -1;
    delta = Math.abs(delta);
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;

    return { days, hours, minutes, past };
  }

  getDaysHoursMinutesBetween(start: Date, end: Date) {
    let delta = Math.abs(start.getTime() - end.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;

    return { days, hours, minutes };
  }
}
