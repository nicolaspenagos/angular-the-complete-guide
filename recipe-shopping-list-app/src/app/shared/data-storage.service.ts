import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

import {  map,  tap } from 'rxjs';

import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { setRecipes } from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url = 'https://angular-course-63e74-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}



  // Hanlding putting token in the params
  // fetchRecipes() {
  //   // take takes only 1 value of the Observable and then auto unsubscribes
  //   // exhaustMap waits for the first observable to be done, there we get the data from the previus Obs
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       console.log(user?.token);
  //       return this.http.get<Recipe[]>(this.url, {
  //         params: new HttpParams().set('auth', user?.token || ''),
  //       });
  //     }),
  //     map((recipes: Recipe[]) => {
  //       return recipes.map((recipe) =>
  //         recipe.ingredients ? recipe : { ...recipe, ingredients: [] }
  //       );
  //     }),
  //     tap((recipes) => {
  //       this.recipesService.setRecipes(recipes);
  //     })
  //   );
  // }

  // Using interceptor for the token..
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipes: Recipe[]) => {
        recipes = recipes ? recipes : [];
        return recipes.map((recipe) =>
          recipe.ingredients ? recipe : { ...recipe, ingredients: [] }
        );
      }),
      tap((recipes) => {
        this.store.dispatch(setRecipes({ recepies: recipes }));
      })
    );
  }
}
