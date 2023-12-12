import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `
      .logHighlighted span{
        color: white;
      }
    `,
  ],
})
export class AppComponent {
  isShowing: boolean = false;
  logs: string[] = [];
  toggleBtn() {
    this.isShowing = !this.isShowing;
    this.logs.push(new Date().toUTCString());
  }
}
