import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { tasksGuard } from '@core/guards/tasks.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./auth/auth.routes').then(r => r.routes)
  },
  {
    path: 'tasks',
    canActivate: [tasksGuard],
    loadChildren: () => import('./taks/tasks.routes').then(r => r.routes)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];
