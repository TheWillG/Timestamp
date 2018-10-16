import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  themeSource: BehaviorSubject<string>;
  themeData: Observable<string>;

  constructor(private storage: Storage) {
    this.themeSource = new BehaviorSubject<string>('light');
    this.themeData = this.themeSource.asObservable();
  }

  setTheme(theme: string) {
    this.storage.set('theme', theme);
    this.themeSource.next(theme);
  }

  async getTheme() {
    return this.storage.get('theme');
  }
}
