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
      },
      {
        path: 'home/add-post',
        loadComponent:() => import('./features/posts/pages/post-add/post-add.component').then(c => c.PostAddComponent),
      },
      {
        path: 'home/posts/:id',
        loadComponent:() => import('./features/posts/pages/post-details/post-details.component').then(c => c.PostDetailsComponent),
      },
      {
        path: 'home/posts/edit/:id',
        loadComponent:() => import('./features/posts/pages/post-edit/post-edit.component').then(c => c.PostEditComponent),
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
