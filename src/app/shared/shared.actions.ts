import {createAction, props} from "@ngrx/store";

export const SET_LOADING_ACTION = `[shared state] Set Loading Spinner`;

export const  setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{status: boolean}>());

export const setErrorMessage = createAction(SET_LOADING_ACTION, props<{message: string}>());
