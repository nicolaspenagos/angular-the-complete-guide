import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipe.actions';
import { state } from '@angular/animations';

export interface RecipesState {
  recepies: Recipe[];
}
const initialState: RecipesState = {
  recepies: [],
};

export const recipesReducer = createReducer(
  initialState,
  on(setRecipes, (state, action) => {
    return {
      ...state,
      recepies: [...action.recepies],
    };
  }),
  on(addRecipe, (state, action) => {

    return {
      ...state,
      recepies: [...state.recepies, action.recipe],
    };
  }),
  on(updateRecipe, (state, action) => {
    const recepies = state.recepies.slice();
    recepies[action.index] = { ...action.recipe };
    return { ...state, recepies };
  }),
  on(deleteRecipe, (state, action) => ({
    ...state,
    recepies: state.recepies.filter((recipe, idx) => action.index !== idx),
  }))
);
