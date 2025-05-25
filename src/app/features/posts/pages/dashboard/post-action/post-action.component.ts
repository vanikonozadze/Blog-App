import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActionComponent } from '../../../components/action/action.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IPost } from '../../../../../core/models/post.model';

@Component({
  selector: 'app-post-action',
  imports: [ActionComponent, AsyncPipe],
  templateUrl: './post-action.component.html',
  styleUrl: './post-action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostActionComponent {
  private readonly route = inject(ActivatedRoute);

  public actionType: string | null =
    this.route.snapshot.paramMap.get('actionType');
  public post$: Observable<IPost | null> = this.route.data.pipe(
    map((data) => data['client']),
  );
}
