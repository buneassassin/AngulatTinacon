import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProfileComponent } from './app/viwe/profile/profile.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
