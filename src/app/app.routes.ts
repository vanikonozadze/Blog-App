import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { postResolver } from './core/resolvers/post.resolver';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'starter',
    loadComponent: () =>
      import('./features/starter/pages/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    canActivate: [AuthGuard],
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
        path: 'home/add-post/:actionType',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-action/post-action.component'
          ).then((c) => c.PostActionComponent),
      },
      {
        path: 'home/posts/:id',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-details/post-details.component'
          ).then((c) => c.PostDetailsComponent),
        resolve: {
          client: postResolver,
        },
      },
      {
        path: 'home/posts/edit/:actionType/:id',
        loadComponent: () =>
          import(
            './features/posts/pages/dashboard/post-action/post-action.component'
          ).then((c) => c.PostActionComponent),
        resolve: {
          client: postResolver,
        },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
