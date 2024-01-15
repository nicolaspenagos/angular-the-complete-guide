import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { Recipe } from './recipe.model';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { fetchRecipes, setRecipes } from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take, tap } from 'rxjs';
import { selectRecipe } from './store/recipe.selectors';

export const recipesResolve: ResolveFn<{ recepies: Recipe[] }> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store<AppState>);
  const actions$ = inject(Actions);

  // When setRecipes is invoked I know that recepies are already there
  // take is for complete and unsusbcribe after one reading

  return store.select(selectRecipe).pipe(
    take(1),
    map((state) => state.recepies),
    switchMap((recepies) => {
      if (recepies.length > 0) {
        return of({ recepies });
      } else {
        store.dispatch(fetchRecipes());
        return actions$.pipe(ofType(setRecipes), take(1));
      }
    })
  );
};
