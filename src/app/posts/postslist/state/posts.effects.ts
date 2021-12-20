import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addPost,
  addPosts,
  addPostsSuccess, deletePostAction, deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.action";
import {map, mergeMap, switchMap} from "rxjs";
import {PostsService} from "../../../../services/posts.service";
import {getPosts} from "./posts.selector";
import {Router} from "@angular/router";

@Injectable()

export class PostsEffects {

  constructor(private action$: Actions, private postsService: PostsService, private router: Router) {
  }

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      mergeMap( (action) => {
        return this.postsService.getPosts().pipe(
          map( (posts) => {
            return loadPostsSuccess({posts})
          })
         )
      })
    )
  });

  addPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPosts),
      mergeMap((action) => {
       return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = {...action.post, id: data.name};
            return addPostsSuccess({post});
          })
        )
      })
    )
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({post: action.post})
          })
        );
      })
    )
  });

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePostAction),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({id: action.id})
          })
        )
      })
    )
  });
}
