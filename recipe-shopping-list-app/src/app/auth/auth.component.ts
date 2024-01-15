import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';

import { PalceholderDirective } from '../shared/placeholder/palceholder.directive';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { clearError, loginStart, signupStart } from './store/auth.actions';
import { selectAuth } from './store/auth.selectors';
import { AuthState } from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy, OnInit {
  private closeSub!: Subscription;
  private storeSub!: Subscription;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;
  // @ViewChild will find the first element containing this type PlaceholderDirective
  @ViewChild(PalceholderDirective, { static: false })
  alertHost!: PalceholderDirective;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select(selectAuth)
      .subscribe((authState: AuthState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) return;
    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ email, password }));
    } else {
      this.store.dispatch(signupStart({ email, password }));
    }

    authForm.reset();
  }

  private showErrorAlert(errorMsg: string) {
    this.alertHost.viewContainerRef.clear();

    const componentRef =
      this.alertHost.viewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = errorMsg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }
}
