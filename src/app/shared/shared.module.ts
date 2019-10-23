import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule, // Give us acess to *Ng if and others, Otherwise we get an error when inport this module on app.module
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [ // If we add this export this module can shares they imports with others modules
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule {}