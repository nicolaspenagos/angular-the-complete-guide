import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recepies: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg'
    ),
    new Recipe(
      'A test recipe 2',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg'
    ),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor() {}
  onRecipeSelected(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
  }
}
