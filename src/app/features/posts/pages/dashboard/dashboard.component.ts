import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { PostListComponent } from './post-list/post-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-dashboard',
  imports: [FilterComponent, PostListComponent, PaginationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
