import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit{
  users: string[] = [];
  toActiveCounter:number = 0;

  constructor(private usersService: UsersService, private counterService:CounterService) {
    counterService.counterChanged.subscribe(()=>{
      this.toActiveCounter = counterService.inactiveToActive;
    })
  }

  ngOnInit(): void {
    this.users = this.usersService.activeUsers;
  }
  onSetToInactive(id: number) {
    this.usersService.setUserToInactive(id);
  }
}
