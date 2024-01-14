import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'recipe-shopping-list-app';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
