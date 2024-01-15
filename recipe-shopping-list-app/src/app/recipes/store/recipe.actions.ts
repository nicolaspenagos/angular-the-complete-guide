import { Action, createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

const SET_RECIPES_ID = '[Recipes] Set Recipes';
const FETCH_RECIPES_ID = '[Recipes] Fetch Recipes';
const ADD_RECIPE_ID = '[Recipe] Add Recipe';
const UPDATE_RECIPE_ID = '[Recipe] Update Recipe';
const DELETE_RECIPE_ID = '[Recipe] Delete Recipe';
const STORE_RECIPES_ID = '[Recipe] Store Recipes';
export const setRecipes = createAction(
  SET_RECIPES_ID,
  props<{ recepies: Recipe[] }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES_ID);

export const addRecipe = createAction(
  ADD_RECIPE_ID,
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE_ID,
  props<{ index: number; recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE_ID,
  props<{ index: number }>()
);

export const storeRecipes = createAction(STORE_RECIPES_ID);
