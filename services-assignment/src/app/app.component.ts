import { Component, DoCheck, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  toInactive!: number;
  toActive!: number;

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {
    this.counterService.counterChanged.subscribe((n:number)=>{
      this.toActive = n;
    })
  }

  
  ngOnInit(): void {

    this.toActive = this.counterService.inactiveToActive;
    this.toInactive = this.counterService.activeToInactive;

  }

}
