import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// This file is the entry point of the Angular app. It starts the application by bootstrapping the AppModule.
// platformBrowserDynamic().bootstrapModule(AppModule) initializes the app by bootstrapping the AppModule, which contains your main application setup.
