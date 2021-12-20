import {createReducer, on} from "@ngrx/store";
import {SharedState, sharedState} from "./shared.state";
import {setErrorMessage, setLoadingSpinner} from "./shared.actions";

const  _sharedReducer = createReducer(
  sharedState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
)



export function sharedReducer(state: SharedState, action: any) {
  return _sharedReducer(state, action);
}


