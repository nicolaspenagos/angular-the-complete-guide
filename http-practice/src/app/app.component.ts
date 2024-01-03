import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './types/post.model';
import { PostsService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string | null = null;
  private errorSub!: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
    // Handling errors
    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe({
      next: (posts: Post[]) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      // Another approach for handling errors
      error: (error: Error) => {
        this.isFetching = false;
        this.error = error.message;
      },
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }
}
