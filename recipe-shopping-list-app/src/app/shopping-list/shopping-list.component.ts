import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingrdient } from '../shared/ingredient.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectShoppingList,
  selectShoppingListIngredients,
} from './store/shopping-list.selectors';
import { AppState } from '../store/app.reducer';
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Observable<Ingrdient[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select(selectShoppingListIngredients);
  }

  onEditItem(id: number): void {
    this.store.dispatch(startEdit({ index: id }));
  }
}
