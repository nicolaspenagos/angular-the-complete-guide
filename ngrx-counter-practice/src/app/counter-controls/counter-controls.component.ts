import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//import { IncrementAction } from '../counter-store/counter.actions';
import { increment, decrement } from '../counter-store/counter.actions';
@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
  standalone: true,
})
export class CounterControlsComponent {
  constructor(private store: Store) {}

  increment() {
   // this.store.dispatch(new IncrementAction(2));
   this.store.dispatch(increment({value:1}))
  }

  decrement() {
   this.store.dispatch(decrement({ value: 5 }));
  }
}
