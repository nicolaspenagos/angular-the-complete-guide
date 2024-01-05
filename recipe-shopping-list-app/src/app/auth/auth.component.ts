import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

import { PalceholderDirective } from '../shared/placeholder/palceholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  private closeSub!: Subscription;
  // error: string | null = null;
  // @ViewChild will find the first element containing this type PlaceholderDirective
  @ViewChild(PalceholderDirective, { static: false })
  alertHost!: PalceholderDirective;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) return;
    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs!: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMsg) => {
        //this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      },
    });

    authForm.reset();
  }

  // onHandleError() {
  //   this.error = null;
  // }

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
