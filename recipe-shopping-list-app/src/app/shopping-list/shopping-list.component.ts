import { Component } from '@angular/core';
import { Ingrdient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: Ingrdient[] = [
    new Ingrdient('Apples', 5),
    new Ingrdient('Tomatos', 10),
  ];
  constructor() {}
}
