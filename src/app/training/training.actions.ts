import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVALIABLE_TRAININGS = '[Training] Set Avaliable Training'; // convention name of the reducer in brakets first.
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';


// The playload is used to pass information
export class SetAvaliableTrainings implements Action {
  readonly type = SET_AVALIABLE_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string) {}
}

// Here I dont need a paylad
export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}



// now we export a type and then we can import only this type in the files and have the autocomplete for actions and payload
export type TrainingActions = SetAvaliableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
