import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { AppState } from '../store/app.reducer';
import { selectAuth } from './store/auth.selectors';
import { AuthState } from './store/auth.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuth).pipe(
      take(1),
      map((authState: AuthState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        // We only tie a token if we have a user
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token || ''),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
