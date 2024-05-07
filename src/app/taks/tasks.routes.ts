import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Tasks',
    loadComponent: () => import('./tasks.component').then(p => p.TasksComponent)
  }
];