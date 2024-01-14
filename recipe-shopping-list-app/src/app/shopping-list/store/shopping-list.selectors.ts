import { state } from '@angular/animations';
import { Ingrdient } from '../../shared/ingredient.model';
import { ShoppingListState } from './shopping-list.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
export const selectShoppingList = (state: AppState) => state.shoppingListState;
export const selectShoppingListIngredients = createSelector(
  selectShoppingList,
  (state: ShoppingListState) => state.ingredients
);
