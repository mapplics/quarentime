import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { InfoPage } from './info.page';
import {HeaderComponent} from '../header/header.component';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoPageRoutingModule,
        HeaderModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    entryComponents: [
        HeaderComponent
    ],
    declarations: [InfoPage]
})
export class InfoPageModule {}
