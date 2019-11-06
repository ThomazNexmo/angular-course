import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading'; // convention name of the reducer in brakets first.
export const STOP_LOADING = '[UI] Stop Loading';


// Now we export all our actions has classes. All action classes need a type
export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

// now we export a type and then we can import only this type in the files and have the autocomplete for actions and payload
export type UIActions = StartLoading | StopLoading;
