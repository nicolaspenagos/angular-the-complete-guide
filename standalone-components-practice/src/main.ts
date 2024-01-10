import { importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(
  AppComponent,
  // Equivalent as provided in root
  // { providers: [AnalyticsService] }
  {
    providers: [importProvidersFrom(AppRoutingModule)],
  }
);
