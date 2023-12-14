import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css',
})
export class GameControlComponent {
  @Output() numberAdder = new EventEmitter<number>();
  @Output() gamePauser = new EventEmitter();

  counter: number = 0;
  interval!: ReturnType<typeof setTimeout> | null;

  incrementNumber() {
    this.counter++;
    this.numberAdder.emit(this.counter);
  }

  onStartGame() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.incrementNumber();
      }, 1000);
    }
  }
  onPauseGame() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.counter = 0;
    }
    this.gamePauser.emit();
  }
}
