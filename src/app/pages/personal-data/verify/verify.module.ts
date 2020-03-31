import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPageRoutingModule } from './verify-routing.module';

import { VerifyPage } from './verify.page';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyPageRoutingModule,
        HeaderModule,
        TranslateModule,
        ReactiveFormsModule,
    ],
  declarations: [VerifyPage]
})
export class VerifyPageModule {}
