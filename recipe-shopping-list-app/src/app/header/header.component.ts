import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { selectAuth } from '../auth/store/auth.selectors';
import { AuthState } from '../auth/store/auth.reducer';
import { logout } from '../auth/store/auth.actions';

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
    private authServices: AuthService,
    private store: Store<AppState>
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnInit(): void {
    this.store
      .select(selectAuth)
      .pipe(map((state: AuthState) => state.user))
      .subscribe((user) => {
        this.isAuthtenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }
}
