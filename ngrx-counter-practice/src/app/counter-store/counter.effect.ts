import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) return of(set({ value: +storedCounter }));
        return of(set({ value: 0 }));
      })
    )
  );

  // Actions returns a value whenever any action is triggered, ofType filter for
  // the specific action we need
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      ),

    {
      // This effects does not dispatch a new action once its done (default is true)
      dispatch: false,
    }
  );

  //  OLDER VERSIONS OF ANGULAR NOT SUPPORTED ANYMORE
  //   @Effect({dispatch:false})
  //   saveCount = this.actions$.pipe(
  //     ofType(increment, decrement),
  //     tap((action) => {
  //       console.log(action);
  //       localStorage.setItem('count', action.value.toString());
  //     })
  //   );
}
