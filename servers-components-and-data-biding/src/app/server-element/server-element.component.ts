import { Component, Input } from '@angular/core';
import { Server } from '../model/server';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
})
export class ServerElementComponent {
  // Exposing this property to the "outside world"
  // element! If you are sure that the property will be assigned a value before it's used, you can use the definitely assigned assertion (!) to tell TypeScript that you will handle the initialization elsewhere:
  @Input('serverElement') element!: Server;
}
