import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntakePageRoutingModule } from './intake-routing.module';

import { IntakePage } from './intake.page';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntakePageRoutingModule,
    HeaderModule,
    TranslateModule
  ],
  declarations: [IntakePage]
})
export class IntakePageModule {}
