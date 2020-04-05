import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThanksPageRoutingModule } from './thanks-routing.module';

import { ThanksPage } from './thanks.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThanksPageRoutingModule,
        TranslateModule
    ],
  declarations: [ThanksPage]
})
export class ThanksPageModule {}
