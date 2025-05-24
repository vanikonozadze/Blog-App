import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPost} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/posts`;

  getPost$(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.BASE_URL}/${id}`);
  }

  getPosts$(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.BASE_URL);
  }

  createPost$(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.BASE_URL, post);
  }

  updatePost$(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.BASE_URL}/${post.id}`, post);
  }

  deletePost$(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
