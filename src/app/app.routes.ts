import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent:() => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      { path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent:() => import('./features/posts/pages/post-list/post-list.component').then(c => c.PostListComponent),
      }
    ]
  }
];
