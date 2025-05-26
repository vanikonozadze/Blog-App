import { PostActionComponent } from '../../features/posts/pages/dashboard/post-action/post-action.component';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class postActionDeactivateGuard
  implements CanDeactivate<PostActionComponent>
{
  canDeactivate(component: PostActionComponent): boolean | Promise<boolean> {
    if (component.hasUnsavedChanges()) {
      return confirm(
        'You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.',
      );
    }

    return true;
  }
}
