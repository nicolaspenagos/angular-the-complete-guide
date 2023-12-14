import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Server } from '../model/server';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css',
})
export class CockpitComponent {
  // newServerName = '';
  // newServerContent = '';
  @Output() serverCreated = new EventEmitter<Server>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<Server>();
  @ViewChild('serverContentInput', { static: true })
  serverContentInput!: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    console.log(nameInput.value);
    this.serverCreated.emit(
      // new Server('server', this.newServerName, this.newServerContent)
      new Server(
        'server',
        nameInput.value,
        this.serverContentInput.nativeElement.value
      )
    );
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit(
      new Server(
        'blueprint',
        nameInput.value,
        this.serverContentInput.nativeElement.value
      )
    );
  }
}
