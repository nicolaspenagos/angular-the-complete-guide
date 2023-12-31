import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingrdient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingrdient[];
  private idChangeSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingrdient[]) => (this.ingredients = ingredients)
    );
  }

  ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
  }

  onEditItem(id: number): void {
    this.shoppingListService.startedEditing.next(id);
  }
}
