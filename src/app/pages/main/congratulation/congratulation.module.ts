import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongratulationPageRoutingModule } from './congratulation-routing.module';

import { CongratulationPage } from './congratulation.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CongratulationPageRoutingModule,
        TranslateModule
    ],
  declarations: [CongratulationPage]
})
export class CongratulationPageModule {}
