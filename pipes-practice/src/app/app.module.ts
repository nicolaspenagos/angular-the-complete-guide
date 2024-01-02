import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';

import { ReversePipe } from './pipes/reverse.pipe';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';

@NgModule({
  declarations: [AppComponent, ShortenPipe, FilterPipe, ReversePipe, SortByDatePipe],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
