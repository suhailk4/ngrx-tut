import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {getPostById} from "../postslist/state/posts.selector";
import {Post} from "../../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {updatePost} from "../postslist/state/posts.action";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  private postSubscription: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (!params.has('id')) {
        return;
      }
      const id = params.get('id');
      console.log(id);
      this.postSubscription = this.store.select(getPostById, {id}).subscribe(data => {
        this.post = data;
        this.createForm();
        console.log(this.post);
      });
    });
  }

  private createForm() {
    this.postForm = new FormGroup({
      id: new FormControl(this.post.id),
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(10)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onSubmitForm(): void {
    console.log('Form ', this.postForm);
    if (!this.postForm.valid) {
      return;
    }
    const postFormValue = this.postForm.getRawValue();
    // dispatch the action
    this.store.dispatch(updatePost({post: postFormValue}));
    this.router.navigate(['/post']);
  }

}
