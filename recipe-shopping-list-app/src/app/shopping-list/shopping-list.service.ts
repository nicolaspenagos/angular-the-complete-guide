import { Injectable } from '@angular/core';
import { Ingrdient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingrdient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingrdient[] = [
    new Ingrdient('Apples', 5),
    new Ingrdient('Tomatos', 10),
  ];
  constructor() {}
  getIngredients(): Ingrdient[] {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingrdient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingrdient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  updateIngredient(index: number, newIngredient: Ingrdient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
