import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import {addPost, addPosts} from '../postslist/state/posts.action';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.postForm);
    const post: Post = {
     title: this.postForm.value.title,
     description: this.postForm.value.description
    };
    // this.store.dispatch(addPost({post: post}));
    this.store.dispatch(addPosts({post}));
    this.postForm.reset();
  }

}
