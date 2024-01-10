import { Action, createReducer, on } from '@ngrx/store';
//import { CounterActions, INCREMENT, IncrementAction } from './counter.actions';
import { decrement, increment, set } from './counter.actions';

const initialState: number = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state: number, action) => {
    // The returned value should be a new value, do not mutate!
    // (this specially applies for arrrays and objects)
    return state + action.value;
  }),
  on(decrement, (state: number, action) => {
    return state - action.value;
  }),
  on(set, (state, action)=>action.value)
);

// createReducer() from @ngrx/store creates such a reducer fn under the hood
// For older versions of NgRx used in former versions of Angular


// export function counterReducer(
//   state: number = initialState,
//   action: CounterActions | Action
// ): number {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
