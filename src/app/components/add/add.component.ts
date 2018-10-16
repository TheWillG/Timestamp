import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  private theme: string;

  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
    this.theme = await this.storageService.getTheme();
    console.log('theme', this.theme);
  }

  back() {
    this.router.navigate(['home']);
  }

}
