import { Subject, Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];


  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
    ) {}

  fetchAvaliableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('avaliableExercise')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        console.log(doc.payload.doc.data()['name'])
        // throw(new Error())
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories']
        };
      });
    })).subscribe((exercises: Exercise[]) => {

      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvaliableTrainings(exercises)); // this need a payload
    }, error => {

      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar('Getching Exercises failed, please try again later', null, 3000);
    }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    // this valueChanges only give us a array of document values without the ID of the document.
    // but we dont need the ID here
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercises)); // this need a payload
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    // if you try to connect to a connection tha not exist yet, fire base create a new one, thats what happens here first time
    this.db.collection('finishedExercises').add(exercise);
  }
}
