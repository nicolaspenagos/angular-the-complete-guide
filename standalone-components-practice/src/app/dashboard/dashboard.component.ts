import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  selector: 'app-dashboard',
})
export class DashboardComponent {}
