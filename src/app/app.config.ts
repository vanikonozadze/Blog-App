import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from '@ngrx/store';
import {postReducer} from './store/post/post.reducer';
import {provideHttpClient} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {postEffects} from './store/post/post.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ posts: postReducer }),
    provideEffects([postEffects]),
    provideHttpClient(),
  ]
};
