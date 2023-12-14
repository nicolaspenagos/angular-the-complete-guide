import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  evens : number[] = [];
  odds:number[] = [];
  onAddNumber(number:number) {
    if(number%2==0){
      this.evens.push(number);
    }else{
      this.odds.push(number);
    }
  }
  onPauseGame() {
    this.evens = [];
    this.odds = [];
  }
}
