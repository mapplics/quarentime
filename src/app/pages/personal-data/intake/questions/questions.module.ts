import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsPageRoutingModule } from './questions-routing.module';

import { QuestionsPage } from './questions.page';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderModule} from '../../../main/header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuestionsPageRoutingModule,
        TranslateModule,
        HeaderModule
    ],
  declarations: [QuestionsPage]
})
export class QuestionsPageModule {}