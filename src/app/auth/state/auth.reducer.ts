import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {autoLogout, loginStart, loginSuccess, signupSuccess} from "./auth.actions";

const _authReducer = createReducer(initialState,
  // on(
  // loginStart, (state) => {
  //   return {
  //     ...state
  //   }
  // }),
  on(loginSuccess, (state, action) => {
      return {
        ...state,
        user: action.user
      }
    }),
    on(signupSuccess, (state, action) => {
        return {
          ...state,
          user: action.user
        }
      }
    ),
    on(autoLogout, (state, action) => {
      return {
        ...state,
        user: null
      }
    })
)

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
