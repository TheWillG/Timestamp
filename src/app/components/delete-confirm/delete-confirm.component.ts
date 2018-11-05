import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  countdownId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.countdownId = this.route.snapshot.params.id;
  }

  async delete() {
    await this.storageService.deleteCountdown(this.countdownId);
    this.router.navigate(['home']);
  }

  back() {
    this.router.navigate(['countdown', this.countdownId]);
  }

}
