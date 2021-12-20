import { createAction, createReducer, on } from "@ngrx/store";
import { increment } from "src/app/counter/counter/state/counter.actions";
import {
  addPost,
  addPosts,
  addPostsSuccess,
  deletePost, deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.action";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(initialState,
    on(addPost, (state, action) => {

        let id = (state.posts.length + 1).toString();
        let newPost = {...action.post};
        newPost.id = id;

        return {
            ...state,
            posts: [...state.posts, newPost]
        }
    }),
    on(updatePost, (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      })
      return {
        ...state,
        posts: updatedPosts
      }
    }),
  on(deletePost, (state, action) => {
     const id = action.id;
     const updatedPosts = state.posts.filter(post => post.id !== id);
     return {
       ...state,
       posts: updatedPosts
     }
  }),
  on(loadPostsSuccess, (state, action) => {
    console.log('Load Success', action.posts);
    return {
      ...state,
      posts: action.posts
    }
  }),
  on(addPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: [...state.posts, action.post]
    }
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post: post
    });
    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(deletePostSuccess, (state, action) => {
    const updatedPosts = state.posts.filter(post => post.id !== action.id);
    return {
      ...state,
      posts: updatedPosts
    }
  })
);

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}
