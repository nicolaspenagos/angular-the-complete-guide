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

  onServerAdded(serverData: Server) {
    
    this.serverElements.push(serverData);
  }

  onBlueprintAdded(blueprintData: Server) {
    this.serverElements.push(blueprintData);
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }
}
