import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVALIABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

// Since this is lazy load, we need extend app.reducer here
// app state dont know about training state, but training state knows about app state

// this is the state of this module
export interface TrainingState {
  avaliavleExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

// this will be my new global state after this module be lazy loaded
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  avaliavleExercises: [],
  finishedExercises: [],
  activeTraining: null
};

// Reducer only for UI, use the reducer actions
export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVALIABLE_TRAININGS :
      return {
        ...state, // Grab the actual state first and then overwite the other things
        avaliavleExercises: action.payload // payload is the data of the action
      };
    case SET_FINISHED_TRAININGS :
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING :
      return {
        ...state,
        activeTraining: {...state.avaliavleExercises.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING :
      return {
        ...state,
        activeTraining: null // Here o Dont need a payload just put null
      };
    default : {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvaliableExercises = createSelector(getTrainingState, (state: TrainingState) => state.avaliavleExercises);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

