import { Routes } from '@angular/router';
import {PostResolver} from './core/resolvers/post.resolver';

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
      },
      {
        path: 'home/posts/:id',
        loadComponent:() => import('./features/posts/pages/post-details/post-details.component').then(c => c.PostDetailsComponent),
        resolve: { postLoaded: PostResolver }
      },
      {
        path: 'home/posts/edit/:id',
        loadComponent:() => import('./features/posts/pages/post-edit/post-edit.component').then(c => c.PostEditComponent),
        resolve: { postLoaded: PostResolver }
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
