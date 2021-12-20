import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST = '[Delete Post] delete post';
export const LOAD_POSTS = '[Load Posts] load posts';
export const LOAD_POSTS_SUCCESS = '[load success] load success';
export const ADD_POST = '[add post] add posts';
export const ADD_POST_SUCCESS = '[add post success] add post success';
export const UPDATE_POST_SUCCESS = '[update post success] update post success';
export const DELETE_POST_ACTION = '[delete post] delete post';
export const DELETE_POST_SUCCESS = '[delete post success] delete post success';


export const addPosts = createAction(ADD_POST, props<{post: Post}>());

export const addPostsSuccess = createAction(ADD_POST_SUCCESS, props<{post: Post}>());

export const addPost = createAction(ADD_POST_ACTION, props<{post: Post}>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{post: Post}>());

export const deletePost = createAction(DELETE_POST, props<{id: string}>());

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{posts: Post[]}>());

export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{post: Post}>());

export const deletePostAction = createAction(DELETE_POST_ACTION, props<{id: string}>());

export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{id: string}>());
