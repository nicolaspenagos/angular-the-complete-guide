import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingrdient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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
  getRecipe(index:number){
    return this.recepies.slice()[index];
  }

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredientsToShoppingList(ingredients: Ingrdient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
