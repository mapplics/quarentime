import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoAnswerPageRoutingModule } from './no-answer-routing.module';

import { NoAnswerPage } from './no-answer.page';
import {HeaderModule} from '../../../../main/header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NoAnswerPageRoutingModule,
        HeaderModule
    ],
  declarations: [NoAnswerPage]
})
export class NoAnswerPageModule {}
