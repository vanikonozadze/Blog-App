import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FilterSortComponent } from '../../components/filter-sort/filter-sort.component';

@Component({
  selector: 'app-dashboard',
  imports: [PostListComponent, PaginationComponent, FilterSortComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
