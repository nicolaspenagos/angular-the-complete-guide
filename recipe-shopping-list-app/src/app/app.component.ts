import { Component } from '@angular/core';
export const pages = {
  Recipes: Symbol('recipes'),
  ShoppingList: Symbol('shoppingList'),
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'recipe-shopping-list-app';
  currentFeature: Symbol = pages.Recipes;
  pages = pages;
  onNavigate(page: Symbol) {
    this.currentFeature = page;
  }
}
