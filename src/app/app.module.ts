import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { P404Component } from './p404/p404.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ReportsComponent } from './reports/reports.component';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    // Only declare the root component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MenuComponent,
    AppComponent,
    LoginComponent, 
    DashboardComponent,
    SummaryComponent,
    ReportsComponent,
    P404Component
  ],
  exports: [MenuComponent, AppComponent],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [],
})
export class AppModule {}
