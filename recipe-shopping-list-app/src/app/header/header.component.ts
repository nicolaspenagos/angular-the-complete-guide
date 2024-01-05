import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  authSubs!: Subscription;
  isAuthtenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authServices: AuthService
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {

    this.authServices.logout();
  }

  ngOnInit(): void {
    this.authServices.user.subscribe((user) => {
      this.isAuthtenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }
}
