import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchRecipes, setRecipes, storeRecipes } from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { selectRecipe } from './recipe.selectors';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://angular-course-63e74-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return setRecipes({ recepies: recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select(selectRecipe)),
        switchMap(([actionData, recepiesState]) => {
          return this.http.put(
            'https://angular-course-63e74-default-rtdb.firebaseio.com/recipes.json',
            recepiesState.recepies
          );
        })
      ),
    { dispatch: false }
  );
}
