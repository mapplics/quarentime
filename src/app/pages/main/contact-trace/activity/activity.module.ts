import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activity-routing.module';

import { ActivityPage } from './activity.page';
import {HeaderModule} from '../../header/header.module';
import {TranslateModule} from '@ngx-translate/core';
import {ModalAcceptComponent} from './modal-accept/modal-accept.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ActivityPageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
    declarations: [
        ActivityPage,
        ModalAcceptComponent
    ],
    entryComponents: [
        ModalAcceptComponent
    ]

})
export class ActivityPageModule {}
