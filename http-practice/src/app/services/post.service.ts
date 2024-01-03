import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types/post.model';
import { Subject, map, catchError, throwError, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PostsService {
  url = 'https://angular-course-63e74-default-rtdb.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}
  error: Subject<string> = new Subject();
  createAndStorePost(postData: Post) {
    // The request only takes places when you subscribe
    this.http
      .post(this.url, postData, {
        // By default its brings the whole body
        // observe: 'body',

        //To get the whole httpReponse
        observe: 'response',
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error: Error) => {
          this.error.next(error.message);
        },
      });
  }

  fetchPosts() {
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append('print', 'pretty');
    // searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(this.url, {
        // HEADERS
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty'),
        // params:searchParams
      })
      .pipe(
        map((responseData) => {
          if (!responseData) return [];
          const postArrays: Post[] = Object.keys(responseData).map((key) => ({
            ...responseData[key],
            id: key,
          }));
          return postArrays;
        }),
        catchError((errorRes) => {
          // Perform here actions about errors not related to the UI
          return throwError(() => new Error('Custom error'));
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(this.url, {
        //
        observe: 'events',
        responseType: 'json',
        // responseType:'text'
        // responseType:'blob'
      })
      .pipe(
        tap((event) => {
          // tab allows you to do something without interrupting the susbscribe fn
          if (event.type === HttpEventType.Response) {
            // if you want to check if you did recive a response
            console.log(event.body);
          }
          console.log(event);
        })
      );
  }
}
