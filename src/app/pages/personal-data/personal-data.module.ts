import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalDataPageRoutingModule } from './personal-data-routing.module';

import { PersonalDataPage } from './personal-data.page';
<<<<<<< HEAD
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalDataPageRoutingModule,
        TranslateModule
    ],
=======

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalDataPageRoutingModule
  ],
>>>>>>> develop
  declarations: [PersonalDataPage]
})
export class PersonalDataPageModule {}
