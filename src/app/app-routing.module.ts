import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// The routes array is empty, which means there are no specific routes defined for this project. 
const routes: Routes = [];

@NgModule({
  // RouterModule.forRoot(routes): This initializes the router with the provided routes. Since there are no routes, the application defaults to displaying whatever is in AppComponent
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// The AppRoutingModule is imported into the appModule.ts, making routing available throughout the app.
export class AppRoutingModule { }
