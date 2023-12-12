import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recepies: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg'
    ),
    new Recipe(
      'A test recipe',
      'This is just a test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/evespudding_83911_16x9.jpg'
    ),
  ];
  constructor() {}
  ngOnInit(): void {}
}
