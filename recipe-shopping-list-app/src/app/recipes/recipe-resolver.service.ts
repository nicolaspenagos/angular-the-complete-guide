import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

export const recipesResolve: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  return recipeService.getRecipies().length > 0
    ? recipeService.getRecipies()
    : dataStorageService.fetchRecipes();
};
