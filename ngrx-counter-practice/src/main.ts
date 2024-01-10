import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { counterReducer } from './app/counter-store/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { CounterEffects } from './app/counter-store/counter.effect';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ counter: counterReducer }),
    provideEffects([CounterEffects]),
  ],
});
