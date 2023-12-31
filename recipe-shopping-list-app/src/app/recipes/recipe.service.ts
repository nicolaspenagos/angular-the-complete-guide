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
  private recepies: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg',
      [new Ingrdient('Meat', 1), new Ingrdient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg',
      [new Ingrdient('Buns', 2), new Ingrdient('Meat', 1)]
    ),
  ];

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

    this.updateList();
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recepies[index] = recipe;
    this.updateList();
  }

  deleteRecipe(index: number) {
    this.recepies.splice(index, 1);
    this.updateList();
  }

  updateList() {
    this.recipesChanged.next(this.recepies.slice());
  }
}
