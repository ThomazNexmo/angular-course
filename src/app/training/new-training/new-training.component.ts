import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = true;
  loadingSubscription: Subscription;


  constructor(
    private trainingService: TrainingService, private uiService: UIService
    ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    // this.exercises = this.trainingService.getAvaliableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
      console.log(this.exercises);
      });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(form)
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
