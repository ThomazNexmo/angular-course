import { Subject, Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private avaliableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  private finishedExercises: Exercise[] = []; // when this change I emmit the finishedExercisesChanged event
  private fbSubs: Subscription[] = [];


  constructor( private db: AngularFirestore, private uiService: UIService ) {}

  fetchAvaliableExercises() {
    this.uiService.loadingStateChanged.next(true);
    console.log(this.fbSubs)
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
      this.uiService.loadingStateChanged.next(false);
      this.avaliableExercises = exercises;
      this.exercisesChanged.next([...this.avaliableExercises]);
    }, error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackBar('Getching Exercises failed, please try again later', null, 3000);
      this.exercisesChanged.next(null); // emit null for the drop down be rendered
    }));
  }

  startExercise(selectedId: string) {
    console.log(selectedId);
    this.runningExercise = this.avaliableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ... this.runningExercise });
    console.log(this.runningExercise);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises() {
    // this valueChanges only give us a array of document values without the ID of the document.
    // but we dont need the ID here
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
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
