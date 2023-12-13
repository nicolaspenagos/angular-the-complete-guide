import { Component } from '@angular/core';
import { Server } from './model/server';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: Server[] = [
    new Server('server', 'TestServer', 'Just a Test!'),
  ];
}
