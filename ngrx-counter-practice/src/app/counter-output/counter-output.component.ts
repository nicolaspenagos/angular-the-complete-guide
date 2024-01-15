import { Component } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {
  selectCount,
  selectDoubleCount,
} from '../counter-store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  imports: [AsyncPipe],
  standalone: true,
})
export class CounterOutputComponent {
  // It is a good practice to decorate properties with the $ at
  // end if those properites store an observable.
  count$!: Observable<number>;
  doubleCount$!: Observable<number>;
  constructor(private store: Store<{ counter: number }>) {
    this.count$ = store.select(selectCount);
    this.doubleCount$ = store.select(selectDoubleCount);
  }
}
