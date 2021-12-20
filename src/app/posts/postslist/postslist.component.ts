import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from './state/posts.selector';
import {deletePost, deletePostAction, loadPosts} from "./state/posts.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  posts$: Observable<Post[]> =  of([]);

  ngOnInit(): void {
    // this.posts$ = this.store.select(getPosts);
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());

  }

  onDeletePost(id: string): void {
    if (window.confirm('Are you sure you want to delete a post with id ' + id  + '?')) {
      // this.store.dispatch(deletePost({id: id}));
      this.store.dispatch(deletePostAction({id}))
      this.router.navigate(['post']);
    }
  }
}
