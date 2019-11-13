import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated'; // convention name of the reducer in brakets first.
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';


// Now we export all our actions has classes. All action classes need a type
export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

// now we export a type and then we can import only this type in the files and have the autocomplete for actions and payload
export type AuthActions = SetAuthenticated | SetUnauthenticated;
