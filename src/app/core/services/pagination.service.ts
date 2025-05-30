import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  private pageSize = 6;

  public totalPages$: Observable<number> = this.totalItems$.pipe(
    map((total) => Math.ceil(total / this.pageSize)),
  );

  public setTotalItems(total: number) {
    this.totalItemsSubject.next(total);
    if (this.currentPageSubject.value > this.totalPages) {
      this.currentPageSubject.next(1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItemsSubject.value / this.pageSize);
  }

  get currentPage(): number {
    return this.currentPageSubject.value;
  }

  public getPageSlice<T>(
    items: T[],
    page: number = this.currentPage,
    pageSize: number = this.pageSize,
  ): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPageSubject.next(this.currentPage + 1);
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPageSubject.next(this.currentPage - 1);
    }
  }
}
