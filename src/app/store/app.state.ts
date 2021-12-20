import { counterReducer } from "../counter/counter/state/counter.reducer";
import { Counterstate } from "../counter/counter/state/counter.state";
import { postsReducer } from "../posts/postslist/state/posts.reducer";
import { PostsState } from "../posts/postslist/state/posts.state";
import {SHARED_STATE_NAME} from "../shared/shared.selector";
import {SharedState} from "../shared/shared.state";
import {sharedReducer} from "../shared/shared.reducer";
import {AUTH_STATE_NAME} from "../auth/state/auth.selector";
import {AuthState} from "../auth/state/auth.state";
import {authReducer} from "../auth/state/auth.reducer";

export interface AppState {
     [SHARED_STATE_NAME]: SharedState,
     [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer
}
