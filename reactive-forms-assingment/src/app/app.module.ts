import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ValidatorWarningsComponent } from './components/validator-warnings/validator-warnings.component';

@NgModule({
  declarations: [AppComponent, ValidatorWarningsComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
