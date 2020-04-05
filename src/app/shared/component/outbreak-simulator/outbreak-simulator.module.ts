import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OutbreakSimulatorComponent} from './outbreak-simulator.component';

@NgModule({
  declarations: [
      OutbreakSimulatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OutbreakSimulatorComponent
  ]
})
export class OutbreakSimulatorModule { }
