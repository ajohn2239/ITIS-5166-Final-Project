import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ReportsComponent } from './reports/reports.component';
import { P404Component } from './p404/p404.component';

export const routes: Routes = [  // Exported as 'routes'
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Uncomment when testing is done
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard]  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]  },
  { path: '**', component: P404Component }
];
