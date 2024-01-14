import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authSucess,
  authFail,
  loginStart,
  signupStart,
  logout,
  autoLogin,
} from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleAuth = ({
  email,
  localId,
  idToken,
  expiresIn,
}: AuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  const loggedUser = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(loggedUser));
  // Automatically gets dispatched sin we are inside of an effect
  // no need of of since map auto returns an Observable
  return authSucess({
    email,
    userId: localId,
    token: idToken,
    expirationDate,
  });
};

const handleError = (errorRes: any) => {
  let errorMsg = 'An unknown error ocurred!';
  if (!errorRes.error || !errorRes.error || !errorRes.error.error) {
    // We have to return a error observable so our main observavble pipe does not die of()
    return of(authFail({ errorMsg }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This email exists already!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'The email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'The password is not correct';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMsg = 'Invalid login credentials';
      break;
  }
  // We have to return a error observable so our main observavble pipe does not die

  return of(authFail({ errorMsg }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((signupStartAction) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            {
              email: signupStartAction.email,
              password: signupStartAction.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(handleAuth),
            catchError(handleError)
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(handleAuth),
            catchError(handleError)
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSucess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || 'null');

        if (!userData) return { type: 'DUMMY' };

        const tokenDate = new Date(userData._tokenExpirationDate);
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          tokenDate
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(expirationDuration);

          return authSucess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: tokenDate,
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );
}

/*

  }
*/
