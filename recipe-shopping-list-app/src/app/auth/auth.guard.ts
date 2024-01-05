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

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
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
