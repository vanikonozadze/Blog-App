import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/posts`;

  public getPost$(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.BASE_URL}/${id}`);
  }

  public getPosts$(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.BASE_URL);
  }

  public createPost$(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.BASE_URL, post);
  }

  public updatePost$(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.BASE_URL}/${post.id}`, post);
  }

  public deletePost$(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
