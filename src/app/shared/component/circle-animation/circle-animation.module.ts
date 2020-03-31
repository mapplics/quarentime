import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CircleAnimationComponent} from './circle-animation.component';



@NgModule({
  declarations: [CircleAnimationComponent],
  imports: [
    CommonModule
  ],
  exports: [CircleAnimationComponent]
})
export class CircleAnimationModule { }
