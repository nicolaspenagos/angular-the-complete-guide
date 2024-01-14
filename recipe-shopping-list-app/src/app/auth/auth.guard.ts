import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuth } from './store/auth.selectors';
import { AuthState } from './store/auth.reducer';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store = inject(Store);
  return store.select(selectAuth).pipe(
    take(1),
    map((state: AuthState) => state.user),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) return true;
      return router.createUrlTree(['/auth']);
    })
    // OLD WAY
    // tap((isAuth) => {
    //     router.navigate(['/auth'])
    // })
  );
};
