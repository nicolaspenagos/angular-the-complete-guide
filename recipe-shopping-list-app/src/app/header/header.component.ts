import { Component, EventEmitter, Output } from '@angular/core';
import { pages } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed: boolean = true;
  pages = pages;

  @Output() featureChanged = new EventEmitter<Symbol>();

  onSelect(feature: Symbol) {
    this.featureChanged.emit(feature);
  }
}
