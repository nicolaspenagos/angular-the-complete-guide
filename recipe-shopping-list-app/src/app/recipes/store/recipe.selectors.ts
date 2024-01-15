import { AppState } from '../../store/app.reducer';

export const selectRecipe = (state: AppState) => state.recipes;
