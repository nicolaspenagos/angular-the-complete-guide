import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  activeToInactive: number = 0;
  inactiveToActive: number = 0;
  counterChanged = new EventEmitter<void>();
  incrementAction(isToInactive: boolean) {
    isToInactive ? this.activeToInactive++ : this.inactiveToActive++;
    this.counterChanged.emit();
  }
}
