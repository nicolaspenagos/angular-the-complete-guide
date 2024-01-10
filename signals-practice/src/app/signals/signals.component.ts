import { NgFor } from '@angular/common';
import {
  Component,
  OnInit,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal<number>(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log('Counter changed: ' + this.counter()));
  }

  increment() {
    // updates fn recives the old value and returns a new value
    //this.counter.update((prevCounter) => prevCounter + 1);

    // Does not recive the old value....
    this.counter.set(this.counter() + 1);

    this.actions.update((prevVal) => [...prevVal, 'INCREMENT']);
  }

  decrement() {
    this.counter.update((prevCounter) => prevCounter - 1);
    this.actions.update((prevVal) => [...prevVal, 'DECREMENT']);
  }
}
