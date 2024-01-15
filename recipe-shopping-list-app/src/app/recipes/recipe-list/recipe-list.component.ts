import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { selectRecipe } from '../store/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recepies!: Recipe[];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  // onRecipeSelected(selectedRecipe: Recipe) {
  //   this.recipeWasSelected.emit(selectedRecipe);
  // }

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectRecipe)
      .pipe(map((state) => state.recepies))
      .subscribe((recipes) => {
        this.recepies = recipes;
      });
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
