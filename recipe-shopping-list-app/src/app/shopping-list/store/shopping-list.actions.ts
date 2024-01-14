import { createAction, props } from '@ngrx/store';
import { Ingrdient } from '../../shared/ingredient.model';

const ADD_INGREDIENT_ID = '[ShoppingList] AddIngredient';
const ADD_INGREDIENTS_ID = '[ShoppingList] AddIngredients';
const UPDATE_INGREDIENT_ID = '[ShoppingList] UpdateIngredient';
const DELETE_INGREDIENT_ID = '[ShoppingList] DeleteIngredient';
const START_EDIT_ID = '[ShoppingList] StartEdit';
const STOP_EDIT_ID = '[ShoppingList] StopEdit';

export const addIngredient = createAction(
  ADD_INGREDIENT_ID,
  props<{ value: Ingrdient }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT_ID,
  props<{ value: Ingrdient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS_ID,
  props<{ value: Ingrdient[] }>()
);

export const deleteIngredient = createAction(DELETE_INGREDIENT_ID);

export const startEdit = createAction(
  START_EDIT_ID,
  props<{ index: number }>()
);

export const stopEdit = createAction(STOP_EDIT_ID);
