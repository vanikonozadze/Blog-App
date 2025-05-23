import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPost} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly BASE_URL = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.BASE_URL);
  }

  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.BASE_URL}/${id}`);
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.BASE_URL, post);
  }

  updatePost(id: number, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.BASE_URL}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
