import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./register/register.component').then(p => p.RegisterComponent)
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component').then(p => p.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];