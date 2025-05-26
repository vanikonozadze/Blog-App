import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActionComponent } from '../../../components/action/action.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { IPost } from '../../../../../core/models/post.model';

@Component({
  selector: 'app-post-action',
  imports: [ActionComponent, AsyncPipe, UpperCasePipe],
  templateUrl: './post-action.component.html',
  styleUrl: './post-action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostActionComponent {
  @ViewChild(ActionComponent) actionComponent!: ActionComponent;
  private readonly route = inject(ActivatedRoute);

  public actionType: string | null =
    this.route.snapshot.paramMap.get('actionType');
  public post$: Observable<IPost | null> = this.route.data.pipe(
    map((data) => data['client']),
  );

  hasUnsavedChanges(): boolean {
    return this.actionComponent
      ? this.actionComponent.hasUnsavedChanges()
      : false;
  }
}
