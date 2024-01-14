import { AuthState, authReducer } from '../auth/store/auth.reducer';
import {
  ShoppingListState,
  shoppingListReducer,
} from '../shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingListState: ShoppingListState;
  authState: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingListState: shoppingListReducer,
  authState: authReducer,
};
