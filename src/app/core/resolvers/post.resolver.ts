import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import {AppState} from '../../store/app.state';
import {selectPostById} from '../../store/post/post.selectors';
import {loadPosts} from '../../store/post/post.actions';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<boolean> {
  private store = inject(Store<AppState>);

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id')!;
    return this.store.select(selectPostById(parseInt(id))).pipe(
      switchMap(post => {
        if (!post) {
          this.store.dispatch(loadPosts());
        }
        return of(true);
      }),
      take(1)
    );
  }
}
