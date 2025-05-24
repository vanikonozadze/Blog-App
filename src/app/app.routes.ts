import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'starter',
    loadComponent: () =>
      import('./features/starter/starter/starter.component').then(
        (c) => c.StarterComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/posts/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },
      {
        path: 'home/add-post',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-add/post-add.component'
          ).then((c) => c.PostAddComponent),
      },
      {
        path: 'home/posts/:id',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-details/post-details.component'
          ).then((c) => c.PostDetailsComponent),
      },
      {
        path: 'home/posts/edit/:id',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-edit/post-edit.component'
          ).then((c) => c.PostEditComponent),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
