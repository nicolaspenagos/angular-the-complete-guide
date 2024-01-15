import { AuthState, authReducer } from '../auth/store/auth.reducer';
import { RecipesState, recipesReducer } from '../recipes/store/recipe.reducer';
import {
  ShoppingListState,
  shoppingListReducer,
} from '../shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingListState: ShoppingListState;
  authState: AuthState;
  recipes: RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingListState: shoppingListReducer,
  authState: authReducer,
  recipes: recipesReducer,
};
