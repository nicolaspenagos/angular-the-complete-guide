import { createSelector } from '@ngrx/store';

// One central place to have your selection logic
export const selectCount = (state: { counter: number }) => state.counter;
export const selectDoubleCount = createSelector(
  selectCount,
  (state: number) => state * 2
);
