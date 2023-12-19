import { EventEmitter, Injectable } from '@angular/core';
import { Ingrdient } from '../shared/ingredient.model';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingrdient[]>();
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
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingrdient[]) {
    // ingredients.forEach((ing) => {
    //   this.addIngredient(ing);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
