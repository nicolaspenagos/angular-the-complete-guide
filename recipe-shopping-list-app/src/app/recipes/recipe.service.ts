import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingrdient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recepies: Recipe[] = [];

  getRecipies() {
    return this.recepies.slice();
  }
  getRecipe(index: number) {
    return this.recepies.slice()[index];
  }

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredientsToShoppingList(ingredients: Ingrdient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recepies.push(recipe);

    this.notifyChange();
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recepies[index] = recipe;
    this.notifyChange();
  }

  deleteRecipe(index: number) {
    this.recepies.splice(index, 1);
    this.notifyChange();
  }

  setRecipes(recipes: Recipe[]) {
    this.recepies = recipes;
    this.notifyChange();
  }

  notifyChange() {
    this.recipesChanged.next(this.recepies.slice());
  }
}
