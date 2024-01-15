import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { ActivatedRoute,  Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { addIngredients } from '../../shopping-list/store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';
import { selectRecipe } from '../store/recipe.selectors';
import { map, switchMap } from 'rxjs';
import { deleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // If the observable was manage by you, dont fogert to clean it up in the onDestroy fn
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select(selectRecipe);
        }),
        map((recipesState) => recipesState.recepies[this.id])
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }
  addIngredientsToShoppingList(): void {
    this.store.dispatch(addIngredients({ value: this.recipe.ingredients }));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onAddToShoppingList() {
    this.store.dispatch(addIngredients({ value: this.recipe.ingredients }));
  }

  onDeleteRecipe() {
    this.store.dispatch(deleteRecipe({ index: this.id }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
