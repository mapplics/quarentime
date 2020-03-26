import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YesAnswerPageRoutingModule } from './yes-answer-routing.module';

import { YesAnswerPage } from './yes-answer.page';
import {HeaderModule} from '../../../../main/header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YesAnswerPageRoutingModule,
    HeaderModule,
    TranslateModule
  ],
  declarations: [YesAnswerPage]
})
export class YesAnswerPageModule {}
