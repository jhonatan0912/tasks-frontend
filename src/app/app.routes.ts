import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.routes)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./taks/tasks.routes').then(r => r.routes)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
