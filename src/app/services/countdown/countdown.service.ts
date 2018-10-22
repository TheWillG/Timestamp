import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  getDaysSince(date: Date): number {
    return Math.ceil((new Date().getTime() - new Date(date).getTime()) / 1000 / 86400);
  }
}
