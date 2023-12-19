import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  users: string[] = [];
  toInactiveCounter: number = 0;
  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {
    counterService.counterChanged.subscribe(() => {
      this.toInactiveCounter = counterService.activeToInactive;
    });
  }
  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.usersService.setUserToActive(id);
  }
}
