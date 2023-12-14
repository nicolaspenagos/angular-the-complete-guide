import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  ContentChild,
} from '@angular/core';
import { Server } from '../model/server';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // Exposing this property to the "outside world"
  // element! If you are sure that the property will be assigned a value before it's used, you can use the definitely assigned assertion (!) to tell TypeScript that you will handle the initialization elsewhere:
  @Input('serverElement') element!: Server;
  @Input() name!: string;
  @ViewChild('heading', { static: true }) header!: ElementRef;
  @ContentChild('contentParagraph', { static: true })
  contentParagraph!: ElementRef;
  constructor() {
    console.log('Constructor call');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChnages called!');
    console.log(changes); // current val, isFirstChange?, previous value
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    // No text here
    console.log('Text content:' + this.header.nativeElement.textContent);
     // No text here
    console.log('Text content of contentParagraph:'+this.contentParagraph.nativeElement.textContent);
  }

  //Whenever angular check for changed hapenned
  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log('Text content of contentParagraph:'+this.contentParagraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    // No text here
    console.log('Text content:' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewInit called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
