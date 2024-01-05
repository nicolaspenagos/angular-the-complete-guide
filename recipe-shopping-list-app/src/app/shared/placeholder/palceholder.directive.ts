import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PalceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
