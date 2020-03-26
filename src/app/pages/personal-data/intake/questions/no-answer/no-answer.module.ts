import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoAnswerPageRoutingModule } from './no-answer-routing.module';

import { NoAnswerPage } from './no-answer.page';
import {HeaderModule} from '../../../../main/header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NoAnswerPageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
  declarations: [NoAnswerPage]
})
export class NoAnswerPageModule {}
