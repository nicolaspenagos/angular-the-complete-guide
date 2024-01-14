import { createReducer, on } from '@ngrx/store';
import { Ingrdient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from './shopping-list.actions';


export interface ShoppingListState {
  ingredients: Ingrdient[];
  editedIngredient: Ingrdient | null;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingrdient('Apples', 5), new Ingrdient('Tomatos', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state: ShoppingListState, action) => {
    return { ...state, ingredients: [...state.ingredients, action.value] };
  }),
  on(updateIngredient, (state: ShoppingListState, action) => {
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = action.value;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(addIngredients, (state: ShoppingListState, action) => {
    return { ...state, ingredients: [...state.ingredients, ...action.value] };
  }),
  on(deleteIngredient, (state: ShoppingListState, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        (ingrdient, index) => index !== state.editedIngredientIndex
      ),
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(startEdit, (state: ShoppingListState, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: { ...state.ingredients[action.index] },
    };
  }),
  on(stopEdit, (state: ShoppingListState, action) => {
    return { ...state, editedIngredient: null, editedIngredientIndex: -1 };
  })
);
