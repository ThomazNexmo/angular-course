import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


// application white state
export interface State {
  ui: fromUI.State;    // this is the UI part only, the UI Reducer. The ui will locks like State interface of ui.reducer.ts
  auth: fromAuth.State;
}

// Here we group all reducers (Just an object with all the reducers)
// ActionReducerMap is generic type and we put type State (Application white State)
// So we have a reducer for slice of aplication white state (Fallow this patter)
export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
}

// utility fucntion (createFeatureSelector is generic function)
// we target as a string the UI slice of our Store
// Give us quick acess
export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

// quick acess to isLoading
// the first argument is the return of createFeatureSelector the ui state
// the second is what to do with the state, in this case we just return the loading proprety via getIsLoading
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
